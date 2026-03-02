const BASE_URL = "/api";

export async function createDashboard(data = {}) {
  const res = await fetch(`${BASE_URL}/dashboard`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create dashboard");
  return res.json();
}

export async function getDashboard(id) {
  const res = await fetch(`${BASE_URL}/dashboard/${id}`);
  if (!res.ok) throw new Error("Failed to fetch dashboard");
  return res.json();
}

export async function updateDashboard(id, data) {
  const res = await fetch(`${BASE_URL}/dashboard/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update dashboard");
  return res.json();
}

export async function deleteDashboard(id) {
  const res = await fetch(`${BASE_URL}/dashboard/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete dashboard");
  return res.json();
}
