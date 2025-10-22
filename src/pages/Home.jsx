import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

import { GetItems } from "../services/item"
import { Recovered } from "../services/item"
import { Button, Card, Badge, Container, Row, Col } from "react-bootstrap"
import { BASE_URL } from "../services/api"

const Home = () => {
  let navigate = useNavigate()
  const [items, setItems] = useState([])

  const handleItems = async () => {
    const data = await GetItems()
    setItems(data)
  }

  useEffect(() => {
    handleItems()
  }, [])

  const updateStatus = async (id) => {
    await Recovered(id)
    await handleItems()
  }

  return (
    <>
      <Button
        variant="success"
        onClick={() => navigate("/additem")}
        className="btn-add-item"
      >
        Lost an item? Report it Missing here!
      </Button>
      <h1 className="title-home">Lost Item List</h1>
      <Container fluid>
        <Row>
          {items
            .filter((item) => item.status !== "Recovered")
            .map((item) => (
              <Col key={item._id} xs={12} sm={6} md={4} lg={3}>
                <Card className="border-0 shadow-sm rounded-3  mb-4 card-hover">
                  <div className="position-relative">
                    <Card.Img
                      variant="top"
                      src={`${BASE_URL}/${item.image}`}
                      alt="This image for item"
                      style={{ height: "10rem", objectFit: "cover" }}
                    />
                    <div className="position-absolute top-0 start-0 m-3 bg-dark bg-opacity-75 rounded px-3 py-2">
                      <Card.Title className="text-white fw-bold mb-0 small">
                        {item.name}
                      </Card.Title>
                    </div>
                    <Badge
                      bg={item.status === "Lost" ? "danger" : "success"}
                      text={item.status === "Lost" ? "dark" : "white"}
                      className="position-absolute top-0 end-0 m-3"
                    >
                      {item.status}
                    </Badge>
                  </div>

                  <Card.Body className="d-flex flex-column">
                    <div className="flex-grow-1">
                      <Card.Text className="d-flex align-items-center mb-3">
                        <i className="bi bi-info-circle me-2 text-info"></i>
                        {item.description}
                      </Card.Text>
                      <Card.Text className="text-muted d-flex align-items-center mb-3 fst-italic">
                        <i className="bi bi-geo-alt me-2 text-success"></i>
                        {item.lastSeen}
                      </Card.Text>
                    </div>
                    <Card.Text className="text-primary d-flex align-items-center fw-semibold">
                      <i className="bi bi-person me-2 text-primary"></i>
                      {item.owner}
                    </Card.Text>
                    {item.status === "Lost" && (
                      <Button
                        variant="primary"
                        onClick={() => updateStatus(item._id)}
                        className="mt-3 card-hover"
                      >
                        <i className="bi bi-check-circle me-2"></i>
                        Found
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </>
  )
}

export default Home
