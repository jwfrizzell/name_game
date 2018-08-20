import React, { Component } from "react";
import { Form, Image, Card, Dropdown, Button, Icon } from "semantic-ui-react";
import axios from "axios";

import { isLoggedIn } from "utils/AuthService";
import styles from "styles/Welcome.js";

const BASE_URL = "http://localhost:3090/";

export default class Welcome extends Component {
	state = {
		imageCollections: [],
		names: [],
		nameKey: "",
		currentImage: {},
		isLoading: false,
		correct: "",
		selectionSize: 6
	};

	async componentDidMount() {
		if (!isLoggedIn()) {
			this.props.history.push("/login");
		} else {
			try {
				this.setState({ isLoading: true });
				const request = await axios.post(
					`${BASE_URL}faces`,
					JSON.stringify({ size: "6" })
				);
				const { data } = request.data;

				this.setState({
					imageCollections: data.images.map(
						({ imageID, imageURL }, index) => ({
							key: parseFloat(index),
							id: imageID,
							url: `http:${imageURL}`
						})
					),
					names: data.names.map(({ id, firstName, lastName }) => ({
						value: id,
						text: firstName + " " + lastName
					})),
					currentImage: {
						id: data.images[0].imageID,
						url: `http:${data.images[0].imageURL}`
					},
					isLoading: false
				});
			} catch (err) {
				this.setState({ loading: false });
			}
		}
	}

	onChangeSetName = (e, { value }) => {
		this.setState({ nameKey: value, correct: "" });
	};

	onClickValidateFaceToName = async (nameID, faceID) => {
		if (nameID !== "" && faceID !== "") {
			const body = {
				id: nameID,
				imageID: faceID
			};

			const request = await axios.post(
				`${BASE_URL}faces/isvalid`,
				JSON.stringify(body)
			);

			this.setState({ correct: request.data.isValid });
		}
	};

	onClickChangeImage = (direction, current) => {
		const { imageCollections } = this.state;
		const currentSelection = imageCollections.filter(i => {
			return i.id === current.id;
		});
		let newKey = 0;

		if (direction === "left") {
			newKey = currentSelection[0].key - 1;
			if (currentSelection[0].key !== 0) {
				this.setState({
					currentImage: {
						id: imageCollections[newKey].id,
						url: imageCollections[newKey].url
					}
				});
			}
		} else {
			newKey = currentSelection[0].key + 1;
			if (currentSelection[0].key + 1 < imageCollections.length) {
				this.setState({
					currentImage: {
						id: imageCollections[newKey].id,
						url: imageCollections[newKey].url
					}
				});
			}
		}
		this.setState({ correct: "", nameKey: "" });
	};

	outputResult() {
		const { correct } = this.state;
		if (correct === "") {
			return;
		}

		let name = "thumbs down";
		let color = "red";

		if (correct === true) {
			name = "thumbs up";
			color = "green";
		}

		return <Icon size="big" inverted circular name={name} color={color} />;
	}

	render() {
		const { currentImage, names, nameKey, isLoading } = this.state;

		return (
			<Form loading={isLoading}>
				<Form.Group style={styles.formGroup}>
					<a
						style={styles.navigation}
						onClick={() =>
							this.onClickChangeImage("left", currentImage)
						}
					>
						<Icon
							size="big"
							name="arrow circle left"
							color="blue"
						/>
					</a>
					<Card style={styles.card}>
						<Card.Content style={styles.cardHeader} />
						<Card.Content>
							<Form.Group widths={16}>
								<Image
									style={styles.image}
									src={currentImage.url}
								/>
							</Form.Group>
						</Card.Content>
						<Card.Content>
							<Form.Group>
								<Dropdown
									style={styles.dropdown}
									placeholder="Select Name"
									search
									value={nameKey}
									options={names}
									fluid
									selection
									onChange={this.onChangeSetName}
								/>
								<Button
									style={styles.validatButton}
									content="Validate"
									onClick={() => {
										this.onClickValidateFaceToName(
											nameKey,
											currentImage.id
										);
									}}
									size="tiny"
									primary
								/>
							</Form.Group>
							<Form.Group />
						</Card.Content>
					</Card>
					<a
						style={styles.navigation}
						onClick={() =>
							this.onClickChangeImage("right", currentImage)
						}
					>
						<Icon
							size="big"
							style={styles.navigation}
							name="arrow circle right"
							color="blue"
						/>
					</a>
				</Form.Group>
				<Form.Group style={styles.iconNotification}>
					{this.outputResult()}
				</Form.Group>
			</Form>
		);
	}
}
