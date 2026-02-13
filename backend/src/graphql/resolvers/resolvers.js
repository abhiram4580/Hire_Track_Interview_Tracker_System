const { AuthenticationError } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const resolvers = {
  Query: {
    me: async (_, __, { prisma, user }) => {
      if (!user) {
        throw new AuthenticationError("Not authenticated");
      }

      return prisma.user.findUnique({
        where: { id: user.id },
      });
    },

    reviews: async (_, __, { prisma, user }) => {
      if (!user) {
        throw new AuthenticationError("Not authenticated");
      }

      const reviews = await prisma.review.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        include: { user: true },
      });

      return reviews.map(review => ({
        ...review,
        interviewDate: review.interviewDate?.toISOString() || null,
        createdAt: review.createdAt?.toISOString() || null,
      }));
    },

    applications: async (_, __, { prisma, user }) => {
      if (!user) {
        throw new AuthenticationError("Not authenticated");
      }

      const apps = await prisma.application.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        include: { user: true },
      });

      return apps.map(app => ({
        ...app,
        interviewDate: app.interviewDate?.toISOString() || null,
      }));
    },

    dashboardStats: async (_, __, { prisma, user }) => {
      if (!user) {
        throw new AuthenticationError("Not authenticated");
      }

      const total = await prisma.application.count({
        where: { userId: user.id },
      });

      const grouped = await prisma.application.groupBy({
        by: ["status"],
        where: { userId: user.id },
        _count: { status: true },
      });

      const stats = {
        total,
        APPLIED: 0,
        SHORTLISTED: 0,
        ONLINE_TEST: 0,
        TECHNICAL_INTERVIEW: 0,
        HR: 0,
        OFFERED: 0,
        REJECTED: 0,
      };

      grouped.forEach((g) => {
        stats[g.status] = g._count.status;
      });

      return stats;
    },

    goals: async (_, __, { prisma, user }) => {
      if (!user) throw new AuthenticationError("Not authenticated");
      return prisma.goal.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' }
      });
    },
  },

  Mutation: {
    register: async (
      _,
      { email, username, password, age, gender, college, dateOfBirth },
      { prisma }
    ) => {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new AuthenticationError("Email already registered");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
          age,
          gender,
          college,
          dateOfBirth: new Date(dateOfBirth),
        },
      });



      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return { token, user };
    },

    login: async (_, { email, password }, { prisma }) => {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new AuthenticationError("Invalid credentials");
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        throw new AuthenticationError("Invalid credentials");
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return { token, user };
    },

    createApplication: async (_, { company, role, status, interviewDate }, { prisma, user }) => {
      if (!user) {
        throw new AuthenticationError("Not authenticated");
      }

      let parsedDate = null;
      if (interviewDate?.trim()) {
        const date = new Date(interviewDate);
        if (!isNaN(date.getTime())) parsedDate = date;
      }

      return prisma.application.create({
        data: {
          company,
          role,
          status,
          interviewDate: parsedDate,
          userId: user.id,
        },
        include: { user: true },
      });
    },

    updateApplicationStatus: async (_, { id, status }, { prisma, user }) => {
      if (!user) {
        throw new AuthenticationError("Not authenticated");
      }

      const application = await prisma.application.findUnique({
        where: { id },
      });

      if (!application || application.userId !== user.id) {
        throw new AuthenticationError("Application not found");
      }

      return prisma.application.update({
        where: { id },
        data: { status },
        include: { user: true },
      });
    },

    updateApplicationDate: async (_, { id, interviewDate }, { prisma, user }) => {
      if (!user) {
        throw new AuthenticationError("Not authenticated");
      }

      const application = await prisma.application.findUnique({
        where: { id },
      });

      if (!application || application.userId !== user.id) {
        throw new AuthenticationError("Application not found");
      }

      let parsedDate = null;
      if (interviewDate) {
        const date = new Date(interviewDate);
        if (!isNaN(date.getTime())) {
          parsedDate = date;
        }
      }

      return prisma.application.update({
        where: { id },
        data: { interviewDate: parsedDate },
        include: { user: true },
      });
    },

    deleteApplication: async (_, { id }, { prisma, user }) => {
      if (!user) {
        throw new AuthenticationError("Not authenticated");
      }

      const application = await prisma.application.findUnique({
        where: { id },
      });

      if (!application || application.userId !== user.id) {
        throw new AuthenticationError("Application not found");
      }

      await prisma.application.delete({
        where: { id },
      });

      return true;
    },

    createReview: async (_, { company, topics, experience, difficulty, interviewDate }, { prisma, user }) => {
      if (!user) {
        throw new AuthenticationError("Not authenticated");
      }

      return prisma.review.create({
        data: {
          company,
          topics,
          experience,
          difficulty,
          interviewDate: (() => {
            if (!interviewDate) return null;
            const date = new Date(interviewDate);
            return isNaN(date.getTime()) ? null : date;
          })(),
          userId: user.id,
        },
        include: { user: true },
      });
    },

    createGoal: async (_, { type, target }, { prisma, user }) => {
      if (!user) throw new AuthenticationError("Not authenticated");
      return prisma.goal.create({
        data: {
          type,
          target,
          userId: user.id
        }
      });
    },

    updateGoalProgress: async (_, { id, progress }, { prisma, user }) => {
      if (!user) throw new AuthenticationError("Not authenticated");
      return prisma.goal.update({
        where: { id },
        data: { progress }
      });
    },

    deleteGoal: async (_, { id }, { prisma, user }) => {
      if (!user) throw new AuthenticationError("Not authenticated");
      await prisma.goal.delete({ where: { id } });
      return true;
    },

    deleteReview: async (_, { id }, { prisma, user }) => {
      if (!user) {
        throw new AuthenticationError("Not authenticated");
      }

      const review = await prisma.review.findUnique({
        where: { id },
      });

      if (!review || review.userId !== user.id) {
        throw new AuthenticationError("Review not found or access denied");
      }

      await prisma.review.delete({
        where: { id },
      });

      return true;
    },
  },
};

module.exports = resolvers;
