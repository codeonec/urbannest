import { useEffect, useState } from "react";
import { Container, Carousel, Row, Col, Button } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import Loading from "../components/Loading";
import { FaChair, FaHeart, FaLocationDot, FaDumbbell } from "react-icons/fa6";
import { FaBed, FaBath, FaParking } from "react-icons/fa";
import { useLogin } from "../contexts/login-context";

const IndividualListing = () => {
    const [listing, setListing] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const params = useParams();
    const { currentUser } = useLogin();

    useEffect(() => {
        const fetchIndividualListing = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`http://localhost:5000/listing/get/${params.id}`);

                if (!response.ok) {
                    throw new Error('Something went wrong');
                }

                const data = await response.json();

                setListing(data);
                setIsLoading(false);
                setError("");
            } catch (error) {
                console.log(error.message);
                setIsLoading(false);
                setError("Please try again! Something went wrong");
            }
        };

        fetchIndividualListing();
    }, [params.id]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Container className="my-3">
            {error && <div className="fw-semibold fs-3">{error}</div>}
            <Carousel fade data-bs-theme="dark" className="my-3">
                {listing.imageUrls.map((image, i) => (
                    <Carousel.Item key={i}>
                        <img
                            className="d-block w-100"
                            style={{
                                height: '400px',
                                borderRadius: '10px',
                                objectFit: "cover"
                            }}
                            src={`http://localhost:5000/assets/listings/${image}`}
                            alt={image}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>

            <Row className="justify-content-center">
                <Col md={8}>
                    <div>
                        <div className="fw-bold fs-3 mb-4">{listing.title}</div>
                        <div>
                            <span className="fw-semibold fs-3">${listing.discountPrice}{" "}</span>
                            {/* <span className="text-decoration-line-through">${listing.regularPrice}</span> */}
                            <span>{listing.type === 'rent' && "/ Month"}</span>
                        </div>
                        <span>(You're getting ${listing.regularPrice - listing.discountPrice} discount on this listing)</span>
                        <div className="d-flex justify-content-start align-items-center gap-2 my-3">
                            <FaLocationDot />
                            <div>{listing.address}</div>
                        </div>

                        <div className="d-flex justify-content-start align-items-center gap-2 my-3">
                            <Button>
                                {listing.type === 'sale'
                                    ? <span className="text">
                                        <span>Buy Now</span>
                                    </span>
                                    : <span className="text">
                                        <span>Rent Now</span>
                                    </span>
                                }
                            </Button>
                            <Button>
                                <FaHeart />
                            </Button>
                        </div>

                        <div className="d-flex flex-column gap-2">
                            <div className="fw-bold">Description</div>
                            <p>{listing.description}</p>
                        </div>

                        <div className="d-flex justify-content-start align-items-center gap-3 my-2">
                            <div className="d-flex justify-content-start align-items-center my-2">
                                <FaBed style={{
                                    width: "30px"
                                }} />
                                <div>{listing.bedrooms} {listing.bedrooms > 1 ? "Beds" : "Bed"}</div>
                            </div>

                            <div className="d-flex justify-content-start align-items-center my-2">
                                <FaBath style={{
                                    width: "30px"
                                }} />
                                <div>{listing.bedrooms} {listing.bedrooms > 1 ? "Baths" : "Bath"}</div>
                            </div>

                            <div className="d-flex justify-content-start align-items-center my-2">
                                <FaParking style={{
                                    width: "30px"
                                }} />
                                <div> {listing.parking ? "Parking" : "No Parking"}</div>
                            </div>

                            <div className="d-flex justify-content-start align-items-center my-2">
                                <FaChair style={{
                                    width: "30px"
                                }} />
                                <div> {listing.furnished ? "Furnished" : "No Furnished"}</div>
                            </div>
                            <div className="d-flex justify-content-start align-items-center my-2">
                                <FaDumbbell style={{
                                    width: "30px"
                                }} />
                                <div> {listing.gym ? "Gym" : "No Gym"}</div>
                            </div>
                        </div>

                        {listing.userRef === currentUser._id
                            &&
                            <Button
                                as={Link}
                                to={`/update-listing/${listing._id}`}
                            >
                                Update Listing
                            </Button>
                        }

                    </div>
                </Col>
            </Row>

        </Container>
    )
}

export default IndividualListing;
