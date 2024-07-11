export function savePointsFilterAction(pointsFilterClick: number) {
  localStorage.removeItem("pointsFilterClicks");
  const date = new Date();
  localStorage.setItem(
    "pointsFilterClicks",
    JSON.stringify({ clicks: pointsFilterClick.toString(), date: `${date}` })
  );
}

export function saveCommsFilterAction(commFilterClick: number) {
  localStorage.removeItem("commsFilterClicks");
  const date = new Date();
  localStorage.setItem(
    "commsFilterClicks",
    JSON.stringify({ clicks: commFilterClick.toString(), date: `${date}` })
  );
}
