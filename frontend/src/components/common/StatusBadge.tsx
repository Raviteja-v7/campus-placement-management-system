interface Props {
  status:
    | "pending"
    | "shortlisted"
    | "interview"
    | "selected"
    | "rejected";
}

const styles = {
  pending: "bg-yellow-100 text-yellow-700",
  shortlisted: "bg-blue-100 text-blue-700",
  interview: "bg-purple-100 text-purple-700",
  selected: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const labels = {
  pending: "Pending",
  shortlisted: "Shortlisted",
  interview: "Interview",
  selected: "Selected",
  rejected: "Rejected",
};

const StatusBadge = ({ status }: Props) => (
  <span
    className={`rounded-full px-3 py-1 text-sm font-medium ${styles[status]}`}
  >
    {labels[status]}
  </span>
);

export default StatusBadge;