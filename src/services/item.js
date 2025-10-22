import Client from "./api"

export const AddNewItem = async (data) => {
  try {
    const res = await Client.post("/", data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetItems = async () => {
  try {
    const res = await Client.get("/")
    return res.data
  } catch (error) {
    throw error
  }
}
