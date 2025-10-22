import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { AddNewItem } from "../services/item.js"
import { Button, Form } from "react-bootstrap"

import "../App.css"

const AddItem = () => {
  let navigate = useNavigate()
  const initialState = {
    name: "",
    description: "",
    lastSeen: "",
    owner: "",
    status: "Lost",
    email: "",
    image: "",
  }

  const [formState, setFormState] = useState(initialState)

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("name", formState.name)
    formData.append("description", formState.description)
    formData.append("lastSeen", formState.lastSeen)
    formData.append("owner", formState.owner)
    formData.append("status", formState.status)
    formData.append("email", formState.email)
    formData.append("image", formState.image)

    await AddNewItem(formData)
    setFormState(initialState)

    navigate("/")
  }

  return (
    <>
      <Button
        variant="success"
        onClick={() => navigate("/")}
        className="btn-home"
      >
        Home
      </Button>

      <div className="form-wrapper">
        <Form onSubmit={handleSubmit} className="custom-form">
          <Form.Group className="filed-form" controlId="name">
            <Form.Label className="filed-label">Name</Form.Label>
            <Form.Control
              className="filed-input"
              name="name"
              type="text"
              placeholder="Enter item name"
              onChange={handleChange}
              value={formState.name}
              required
              autoComplete="name"
            />
          </Form.Group>
          <Form.Group className="filed-form" controlId="description">
            <Form.Label className="filed-label">Description</Form.Label>
            <Form.Control
              className="filed-input"
              name="description"
              type="text"
              placeholder="Describe the item in detail (color, brand, size...)"
              onChange={handleChange}
              value={formState.description}
              autoComplete="description"
            />
            <Form.Text className="text-muted">If available</Form.Text>
          </Form.Group>
          <Form.Group className="filed-form" controlId="lastSeen">
            <Form.Label className="filed-label">Last Seen</Form.Label>
            <Form.Control
              className="filed-input"
              name="lastSeen"
              type="text"
              placeholder="Approximate place item was lost"
              onChange={handleChange}
              value={formState.lastSeen}
              autoComplete="off"
            />
            <Form.Text className="text-muted">If available</Form.Text>
          </Form.Group>
          <Form.Group className="filed-form" controlId="owner">
            <Form.Label className="filed-label">Owner Name</Form.Label>
            <Form.Control
              className="filed-input"
              name="owner"
              type="text"
              placeholder="Enter your name"
              onChange={handleChange}
              value={formState.owner}
              autoComplete="owner"
            />
          </Form.Group>
          <Form.Group className="filed-form" controlId="email">
            <Form.Label className="filed-label">Owner Email</Form.Label>
            <Form.Control
              className="filed-input"
              name="email"
              type="email"
              placeholder="example@example.com"
              onChange={handleChange}
              value={formState.email}
              required
              autoComplete="email"
            />
          </Form.Group>
          <Form.Group className="filed-form" controlId="image">
            <Form.Label className="filed-label"> Upload Image</Form.Label>
            <Form.Control
              className="filed-input"
              name="image"
              type="file"
              onChange={handleChange}
              accept="image/*"
            />
            <Form.Text className="text-muted">If available</Form.Text>
          </Form.Group>
          <Button
            disabled={!formState.email && !formState.name && !formState.owner}
            variant="primary"
            type="submit"
          >
            Add
          </Button>
        </Form>
      </div>
    </>
  )
}

export default AddItem
