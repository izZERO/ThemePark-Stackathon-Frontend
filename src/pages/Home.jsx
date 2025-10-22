import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

import { GetItems } from "../services/item"
import { Recovered } from "../services/item"
import { Button, Card, Badge, Container, Row, Col } from "react-bootstrap"
import { BASE_URL } from "../services/api"

const Home = () => {
  let navigate = useNavigate()
  const [items, setItems] = useState([])

  useEffect(() => {
    const handleItems = async () => {
      const data = await GetItems()
      setItems(data)
    }

    handleItems()
  }, [])

  const updateStatus = async (id) => {
    await Recovered(id)
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
                <Card style={{ width: "18rem", position: "relative" }}>
                  <div style={{ position: "relative" }}>
                    <Card.Img
                      variant="top"
                      src={`${BASE_URL}/${item.image}`}
                      alt="This image for item"
                      style={{ height: "10rem", objectFit: "cover" }}
                    />
                    <Card.ImgOverlay className="img-overlay-custom">
                      <Card.Title>{item.name}</Card.Title>
                      <Badge bg="warning" text="dark" className="status-badge">
                        {item.status}
                      </Badge>
                    </Card.ImgOverlay>
                  </div>

                  <Card.Body className="card-body-flex">
                    <div className="card-text-grow">
                      <Card.Text className="text-dark">
                        {item.description}
                      </Card.Text>
                      <Card.Text className="text-secondary">
                        {item.lastSeen}
                      </Card.Text>
                    </div>
                    <Card.Text className="text-danger">{item.owner}</Card.Text>
                    {item.status === "Lost" && (
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={() => updateStatus(item._id)}
                      >
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
