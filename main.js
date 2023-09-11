function calculatePercentages() {
  const trainingHours =
    parseFloat(document.getElementById("trainingHours").value) || 0;
  const trainingMinutes =
    parseFloat(document.getElementById("trainingMinutes").value) || 0;
  const sleepHours =
    parseFloat(document.getElementById("sleepHours").value) || 0;
  const sleepMinutes =
    parseFloat(document.getElementById("sleepMinutes").value) || 0;
  const workHours = parseFloat(document.getElementById("workHours").value) || 0;
  const workMinutes =
    parseFloat(document.getElementById("workMinutes").value) || 0;

  const trainingTotal = trainingHours + trainingMinutes / 60;
  const sleepTotal = (sleepHours + sleepMinutes / 60) * 7; // Multiply by 7 for the week
  const workTotal = (workHours + workMinutes / 60) * 7; // Multiply by 7 for the week

  const trainingPercentage = ((trainingTotal / 168) * 100).toFixed(2);
  const sleepPercentage = ((sleepTotal / 168) * 100).toFixed(2);
  const workPercentage = ((workTotal / 168) * 100).toFixed(2);
  const totalProductivePercentage =
    parseFloat(trainingPercentage) +
    parseFloat(sleepPercentage) +
    parseFloat(workPercentage);

  // Display results
  document.getElementById(
    "trainingPercentage"
  ).textContent = `Training: ${trainingPercentage}% of the week`;
  document.getElementById(
    "sleepPercentage"
  ).textContent = `Sleep: ${sleepPercentage}% of the week`;
  document.getElementById(
    "workPercentage"
  ).textContent = `Work: ${workPercentage}% of the week`;
  document.getElementById(
    "totalProductive"
  ).textContent = `Total Productive: ${totalProductivePercentage.toFixed(
    2
  )}% of the week`;

  const canvas = document.getElementById("activityChart");
  const ctx = canvas.getContext("2d");

  const totalPercentage = trainingPercentage + sleepPercentage + workPercentage;
  const unusedPercentage = 100 - totalPercentage;

  const data = [
    { percentage: sleepPercentage, color: "#A8E6CF", label: "Sleep" }, // Soft green
    { percentage: trainingPercentage, color: "#AEDFF7", label: "Training" }, // Soft blue
    { percentage: workPercentage, color: "#FFA69E", label: "Work" }, // Soft red
    { percentage: unusedPercentage, color: "#d3d3d3", label: "Unused" }, // Light grey
  ];

  let startAngle = 0;
  for (let segment of data) {
    ctx.fillStyle = segment.color;
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.arc(
      200,
      200,
      200,
      startAngle,
      startAngle + Math.PI * 2 * (segment.percentage / 100)
    );
    ctx.lineTo(200, 200);
    ctx.fill();
    startAngle += Math.PI * 2 * (segment.percentage / 100);
  }

  document.getElementById("trainingPercentage").style.color = "#AEDFF7";
  document.getElementById("sleepPercentage").style.color = "#A8E6CF";
  document.getElementById("workPercentage").style.color = "#FFA69E";
}
