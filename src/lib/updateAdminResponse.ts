export async function updateAdminResponse(
  id: string,
  adminResponse: string,
  token: string
): Promise<{ status: boolean; message: string }> {
  if (!id) {
    throw new Error("Contact message ID is required");
  }

  if (!token) {
    throw new Error("Authentication token is required");
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ adminResponse }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message ||
          `Failed to update admin response: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating admin response:", error);
    throw error;
  }
}
