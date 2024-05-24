export function getStatusBg(status) {
  let color;
  switch (status) {
    case "Aman":
      color = "#d1e7dd";
      break;
    case "Demonstrasi":
      color = "#fff3cd";
      break;
    case "Kebakaran":
      color = "#f8d7da";
      break;
    case "Pencurian":
      color = "#d1d7f8";
      break;
    default:
      color = "#ffffff";
      break;
  }
  return color;
}
