

export const getProgressBarData = (plan) => {
  const end = new Date(plan.end).getTime();
  const start = new Date(plan.start).getTime();

  const planInDays = Math.round(Math.abs(end - start) / (24 * 60 * 60 * 1000));
  const todayInMiliseconds = new Date().getTime();
  let daysLeft = 0;
  let progressBarValue = 0;

  if (todayInMiliseconds > end) {
    progressBarValue = 100;
  } else if (todayInMiliseconds < end && todayInMiliseconds > start) {
    const daysFromStart = Math.round((todayInMiliseconds - start) / (24 * 60 * 60 * 1000));
    progressBarValue = Math.round((daysFromStart * 100) / planInDays) - 1;
    daysLeft = planInDays - daysFromStart;
  } else if (todayInMiliseconds < start) {
    daysLeft = planInDays;
  }
  return { daysLeft, progressBarValue };
}
