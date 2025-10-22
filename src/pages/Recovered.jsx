import { Link } from "react-router-dom"
import axios from "axios"
import { useParams } from "react-router-dom"
import "../App.css"
import { useEffect, useState } from "react"
import { BASE_URL } from "../globals"

const Recovered = () => {
  const { id } = useParams()
  const [response, setResponse] = useState(null)

  useEffect(() => {
    const verify = async () => {
      try {
        const result = await axios.get(`${BASE_URL}/${id}`)
        setResponse(true)
      } catch (error) {
        setResponse(false)
      }
    }

    verify()
  }, [id])

  return response ? (
    <div className="email-container">
      <h1 className="email-title">🎉 All Done</h1>

      <p>
        <strong>Thank You for Verifying your Recovery</strong>
      </p>

      <p>
        <small>have a wonderful day at Zero's Park!</small>
      </p>

      <hr className="email-divider" />
      <p>
        <small>
          Zero's Park Security Department
          <br />
          If you have any questions, please visit our Security Office.
        </small>
      </p>
    </div>
  ) : (
    <div className="email-container">
      <h1 className="email-title error">⚠️ Oops! Something Went Wrong</h1>

      <p>
        <strong>We couldn’t verify your recovery at this time.</strong>
      </p>

      <p>Please try again later or contact the Security Office for help.</p>

      <hr className="email-divider" />
      <p>
        <small>
          Zero's Park Security Department
          <br />
          We're here to assist you with any lost and found inquiries.
        </small>
      </p>
    </div>
  )
}

export default Recovered
