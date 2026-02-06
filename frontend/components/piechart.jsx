import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ stats }) => {
  const data = {
    labels: [
      "Applied",
      "Shortlisted",
      "Online Test",
      "Technical Interview",
      "HR",
      "Offered",
      "Rejected",
    ],
    datasets: [
      {
        data: [
          stats.APPLIED,
          stats.SHORTLISTED,
          stats.ONLINE_TEST,
          stats.TECHNICAL_INTERVIEW,
          stats.HR,
          stats.OFFERED,
          stats.REJECTED,
        ],
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;
