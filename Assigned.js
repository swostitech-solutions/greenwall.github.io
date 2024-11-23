import { React, useState,useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Image,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BsClipboard2CheckFill } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";
import { TbArrowLeft } from "react-icons/tb";
import { MdClose } from "react-icons/md";
import "./Details.css";

const Assigned = () => {
  const [show, setShow] = useState(false);
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // This will take the user back to the previous page
  };
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://15.206.153.95:5114/api/UserBookingStatus/UserBookingStatusListByUserId?loginId=3"
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container fluid className="mb-5" style={{ maxWidth: "84rem" }}>
      {/* Header */}
      <Row className="mt-1">
        <Col lg={12}>
          <Card className="border-0">
            <Card.Header
              className="d-flex align-items-center mb-1"
              style={{ background: "none", paddingBottom: "10px" }}
            >
              <Button
                className="border-0 bg-white text-dark lg"
                onClick={goBack}
              >
                <TbArrowLeft />
              </Button>
              <div className="d-block align-items-center mb-1">
                <Card.Title className="text-dark mb-0 ms-2">
                  My Bookings
                </Card.Title>
                <p className="text-dark mb-0 ms-2">Fri, Aug 2nd at 12:00 PM</p>
              </div>
            </Card.Header>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4 justify-content-center">
        <Col lg={12}>
          <Row className="g-4">
            {/* Right column containing Thanks and Booking details */}
            <Col md={7}>
              {/* Booking Accepted Card */}
              <Card className="mb-3">
                <Card.Body className="p-3">
                  <p className="d-flex">
                    <a style={{ marginRight: "5px", color: "#EB6003" }}>
                      <BsClipboard2CheckFill />
                    </a>
                    <h6>Booking accepted</h6>
                  </p>

                  <div className="d-flex align-items-center mt-3">
                    <img
                      src="https://via.placeholder.com/50" // Replace with technician's image URL
                      alt="Technician"
                      className="rounded-circle"
                      style={{ width: "50px", height: "50px" }}
                    />
                    {data.map((item) => (
                    <div className="ms-3">
                      <p className="mb-0">Technician: {item.techname || "Not Assigned"}</p>
                    </div>
                       ))}
                  </div>
                  <Card
                    className="d-flex p-3 mb-4 mt-5"
                    style={{ backgroundColor: "#f7f7f7", borderRadius: "8px" }}
                  >
                    <div className="d-flex justify-content-between w-100">
                      <div>
                        <a>
                          Free cancellation/reschedule before Fri, Aug 02, 09:00
                          AM.
                        </a>{" "}
                        &nbsp;
                        <a
                          href="#more"
                          style={{ textDecoration: "underline", color: "#000" }}
                        >
                          Know more
                        </a>
                      </div>
                      <div>
                        <Button
                          className="border-0 bg-transparent text-dark"
                          aria-label="Close"
                        >
                          <MdClose />
                        </Button>
                      </div>
                    </div>
                  </Card>
                  <p>Next: Assigning professional</p>
                </Card.Body>
              </Card>

              {/* About Your Service */}
              {/* <Card className="mb-3">
                <Card.Body>
                  <h6>About your service</h6>
                  <Row>
                    <Col xs={2}>
                      <img src="https://via.placeholder.com/50" alt="Icon" />
                    </Col>
                    <Col xs={10}>
                      <h5>Genuine product guarantee</h5>
                      <p>Products verified with barcode scanning on every job</p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card> */}

              {/* Cancellation Policy */}
              <Card className="mb-3">
                <Card.Body>
                  <h6>Cancellation & reschedule policy</h6>
                  <p>
                    Free cancellations/reschedules if done more than 3 hrs
                    before the service
                  </p>
                </Card.Body>
              </Card>
            </Col>

            {/* Right Section */}
            <Col md={5}>
              {/* Booking Details Card */}
              <Card className="mb-3">
                <Card.Body>
                  <h6>Booking details</h6>
                  <p>Amount to pay: ₹908</p>
                  <Button
                    variant="light"
                    style={{
                      position: "absolute",
                      top: "20%",
                      right: "15px",
                      transform: "translateY(-50%)",
                      backgroundColor: "transparent",
                      border: "none",
                      padding: "0",
                    }}
                  >
                    <MdKeyboardArrowRight
                      style={{ fontSize: "1.5em", color: "#EE7200" }}
                      onClick={handleShow}
                    />
                  </Button>
                  <Button
                    variant="primary"
                    className="mb-3 service"
                    style={{ background: "#EE7200" }}
                  >
                    Pay Now
                  </Button>
                  <p>14, Patia, Bhubaneswar, Odisha, India</p>
                  <p>Fri, Aug 2nd at 12:00 PM</p>
                  <Button variant="secondary" className="me-2">
                    Reschedule
                  </Button>
                  <Button variant="danger">Cancel booking</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Payment Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-scroll">
          <div className="payment-summary">
            <div className="service-item">
              <div>Cut, file & polish x 2</div>
              <div className="text-muted">Cut, file & polish x 1</div>
              <div className="text-end">₹398</div>
            </div>
            <div className="service-item">
              <div>Cut, file & polish x 2</div>
              <div className="text-muted">Cut, file & polish x 1</div>
              <div className="text-end">₹298</div>
            </div>
            <hr style={{ border: "1px dotted #000;" }}></hr>
            <div className="charge-item">
              <div>Surge</div>
              <div className="text-end">₹150</div>
            </div>
            <div className="charge-item">
              <div>Taxes and Fee</div>
              <div className="text-muted">
                Taxes levied as per Govt. regulations, subject to change basis
                final service value. The fee goes towards training of partners
                and providing support & assistance during the service.
              </div>
              <div className="text-end">₹49</div>
            </div>
            <hr style={{ borderTop: "dotted 1px;" }} />
            <div className="total-item">
              <div>Amount paid</div>
              <div className="text-end">₹895</div>
            </div>
            <div className="refund-item text-success">
              <div>Refund of ₹209</div>
              <div className="text-end">-₹209</div>
            </div>
            <hr />
            <div className="payment-mode">
              <div>Payment mode</div>
              <div className="text-muted">UPI</div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Assigned;



// import { React, useState,useEffect } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Button,
//   Card,
//   Image,
//   Modal,
// } from "react-bootstrap";
// import { useNavigate, useParams } from "react-router-dom";
// import { BsClipboard2CheckFill } from "react-icons/bs";
// import { MdKeyboardArrowRight } from "react-icons/md";
// import { TbArrowLeft } from "react-icons/tb";
// import { MdClose } from "react-icons/md";
// import "./Details.css";

// const Assigned = () => {
//   const { id } = useParams(); // Retrieve `id` from the URL
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//   const goBack = () => {
//     navigate(-1); // Navigate to the previous page
//   };

//   useEffect(() => {
//     const fetchBookingDetails = async () => {
//       try {
//         const response = await fetch(
//           `http://15.206.153.95:5114/api/UserBookingStatus/BookingDetailsById?id=${id}`
//         );
//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         console.error("Error fetching booking details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookingDetails();
//   }, [id]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (!data) {
//     return <p>No booking details found.</p>;
//   }

//   return (
//     <Container fluid className="mb-5" style={{ maxWidth: "84rem" }}>
//       {/* Header */}
//       <Row className="mt-1">
//         <Col lg={12}>
//           <Card className="border-0">
//             <Card.Header
//               className="d-flex align-items-center mb-1"
//               style={{ background: "none", paddingBottom: "10px" }}
//             >
//               <Button
//                 className="border-0 bg-white text-dark lg"
//                 onClick={goBack}
//               >
//                 <TbArrowLeft />
//               </Button>
//               <div className="d-block align-items-center mb-1">
//                 <Card.Title className="text-dark mb-0 ms-2">
//                   My Bookings
//                 </Card.Title>
//                 <p className="text-dark mb-0 ms-2">Fri, Aug 2nd at 12:00 PM</p>
//               </div>
//             </Card.Header>
//           </Card>
//         </Col>
//       </Row>

//       <Row className="mt-4 justify-content-center">
//         <Col lg={12}>
//           <Row className="g-4">
//             {/* Right column containing Thanks and Booking details */}
//             <Col md={7}>
//               {/* Booking Accepted Card */}
//               <Card className="mb-3">
//                 <Card.Body className="p-3">
//                   <p className="d-flex">
//                     <a style={{ marginRight: "5px", color: "#EB6003" }}>
//                       <BsClipboard2CheckFill />
//                     </a>
//                     <h6>Booking accepted</h6>
//                   </p>

//                   <div className="d-flex align-items-center mt-3">
//                     <img
//                       src="https://via.placeholder.com/50" // Replace with technician's image URL
//                       alt="Technician"
//                       className="rounded-circle"
//                       style={{ width: "50px", height: "50px" }}
//                     />
//                     {data.map((item) => (
//                       <div className="ms-3">
//                         <p className="mb-0">
//                           Technician: {item.techname || "Not Assigned"}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                   <Card
//                     className="d-flex p-3 mb-4 mt-5"
//                     style={{ backgroundColor: "#f7f7f7", borderRadius: "8px" }}
//                   >
//                     <div className="d-flex justify-content-between w-100">
//                       <div>
//                         <a>
//                           Free cancellation/reschedule before Fri, Aug 02, 09:00
//                           AM.
//                         </a>{" "}
//                         &nbsp;
//                         <a
//                           href="#more"
//                           style={{ textDecoration: "underline", color: "#000" }}
//                         >
//                           Know more
//                         </a>
//                       </div>
//                       <div>
//                         <Button
//                           className="border-0 bg-transparent text-dark"
//                           aria-label="Close"
//                         >
//                           <MdClose />
//                         </Button>
//                       </div>
//                     </div>
//                   </Card>
//                   <p>Next: Assigning professional</p>
//                 </Card.Body>
//               </Card>

//               {/* About Your Service */}
//               {/* <Card className="mb-3">
//                 <Card.Body>
//                   <h6>About your service</h6>
//                   <Row>
//                     <Col xs={2}>
//                       <img src="https://via.placeholder.com/50" alt="Icon" />
//                     </Col>
//                     <Col xs={10}>
//                       <h5>Genuine product guarantee</h5>
//                       <p>Products verified with barcode scanning on every job</p>
//                     </Col>
//                   </Row>
//                 </Card.Body>
//               </Card> */}

//               {/* Cancellation Policy */}
//               <Card className="mb-3">
//                 <Card.Body>
//                   <h6>Cancellation & reschedule policy</h6>
//                   <p>
//                     Free cancellations/reschedules if done more than 3 hrs
//                     before the service
//                   </p>
//                 </Card.Body>
//               </Card>
//             </Col>

//             {/* Right Section */}
//             <Col md={5}>
//               {/* Booking Details Card */}
//               <Card className="mb-3">
//                 <Card.Body>
//                   <h6>Booking details</h6>
//                   <p>Amount to pay: ₹908</p>
//                   <Button
//                     variant="light"
//                     style={{
//                       position: "absolute",
//                       top: "20%",
//                       right: "15px",
//                       transform: "translateY(-50%)",
//                       backgroundColor: "transparent",
//                       border: "none",
//                       padding: "0",
//                     }}
//                   >
//                     <MdKeyboardArrowRight
//                       style={{ fontSize: "1.5em", color: "#EE7200" }}
//                       onClick={handleShow}
//                     />
//                   </Button>
//                   <Button
//                     variant="primary"
//                     className="mb-3 service"
//                     style={{ background: "#EE7200" }}
//                   >
//                     Pay Now
//                   </Button>
//                   <p>14, Patia, Bhubaneswar, Odisha, India</p>
//                   <p>Fri, Aug 2nd at 12:00 PM</p>
//                   <Button variant="secondary" className="me-2">
//                     Reschedule
//                   </Button>
//                   <Button variant="danger">Cancel booking</Button>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </Col>
//       </Row>

//       <Modal
//         show={show}
//         onHide={handleClose}
//         backdrop="static"
//         keyboard={false}
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Payment Summary</Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="modal-body-scroll">
//           <div className="payment-summary">
//             <div className="service-item">
//               <div>Cut, file & polish x 2</div>
//               <div className="text-muted">Cut, file & polish x 1</div>
//               <div className="text-end">₹398</div>
//             </div>
//             <div className="service-item">
//               <div>Cut, file & polish x 2</div>
//               <div className="text-muted">Cut, file & polish x 1</div>
//               <div className="text-end">₹298</div>
//             </div>
//             <hr style={{ border: "1px dotted #000;" }}></hr>
//             <div className="charge-item">
//               <div>Surge</div>
//               <div className="text-end">₹150</div>
//             </div>
//             <div className="charge-item">
//               <div>Taxes and Fee</div>
//               <div className="text-muted">
//                 Taxes levied as per Govt. regulations, subject to change basis
//                 final service value. The fee goes towards training of partners
//                 and providing support & assistance during the service.
//               </div>
//               <div className="text-end">₹49</div>
//             </div>
//             <hr style={{ borderTop: "dotted 1px;" }} />
//             <div className="total-item">
//               <div>Amount paid</div>
//               <div className="text-end">₹895</div>
//             </div>
//             <div className="refund-item text-success">
//               <div>Refund of ₹209</div>
//               <div className="text-end">-₹209</div>
//             </div>
//             <hr />
//             <div className="payment-mode">
//               <div>Payment mode</div>
//               <div className="text-muted">UPI</div>
//             </div>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </Container>
//   );
// };

// export default Assigned;
