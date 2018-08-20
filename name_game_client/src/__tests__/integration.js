import React from "react";
import { mount } from "enzyme";
import moxios from "moxios";

import Welcome from "components/Welcome.js";
import localStorage from "utils/localStorage.js";

var originalTimeout;

beforeEach(() => {
	moxios.install();
	moxios.stubRequest("http://localhost:3090/faces", {
		status: 200,
		response: {
			data: {
				names: [
					{
						id: "52sUSQZiQUqo0ege4wUmy4",
						firstName: "Matthew",
						lastName: "Baranowski"
					},
					{
						id: "56zuFgdeoMqAOuIKe0M4AU",
						firstName: "Ashley",
						lastName: "Joost"
					},
					{
						id: "4f0HPrOjBYWWEw06eU26Q",
						firstName: "Sean",
						lastName: "Harvey"
					}
				],
				images: [
					{
						id: "56zuFgdeoMqAOuIKe0M4AU",
						imageID: "ezBlWGiV9ucqAsiOo0Iy2",
						imageURL:
							"//images.ctfassets.net/3cttzl4i3k1h/ezBlWGiV9ucqAsiOo0Iy2/01a8ed75dd4a508b45defea73fef6e80/headshot_ashley_joost.jpg"
					},
					{
						id: "4f0HPrOjBYWWEw06eU26Q",
						imageID: "4IqIPfZlFeK4SMC2GCSE4q",
						imageURL:
							"//images.ctfassets.net/3cttzl4i3k1h/4IqIPfZlFeK4SMC2GCSE4q/b29bf93afec3cab2a55f6e6a8c98a351/headshot_sean_harvey.jpg"
					},
					{
						id: "52sUSQZiQUqo0ege4wUmy4",
						imageID: "avLdCFJYHKqWOeagmWq6u",
						imageURL:
							"//images.ctfassets.net/3cttzl4i3k1h/avLdCFJYHKqWOeagmWq6u/11b0d92856fbbba84c9da2c94f23c2c0/headshot_matt_baranowski2.jpg"
					}
				]
			}
		}
	});

	//Bypass Auth0
	localStorage.setLocalStorage();
});

describe("Welcome Integration Test", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<Welcome />);

		wrapper
			.find("#id-name-dropdown")
			.at(0)
			.simulate("change", { event: { value: "4f0HPrOjBYWWEw06eU26Q" } });
		wrapper.update();
	});

	it("should be able to fetch images and increment the correct answer", done => {
		moxios.stubRequest("http://localhost:3090/faces/isvalid", {
			status: 200,
			response: {
				isValid: true
			}
		});
		wrapper.setState({
			nameKey: "4f0HPrOjBYWWEw06eU26Q",
			currentImage: { key: 1, id: "avLdCFJYHKqWOeagmWq6u", url: "" }
		});

		validateAnswer("correctAnswers", done);
	});

	it("should be able to fetch images and increment the incorrect answer", done => {
		moxios.stubRequest("http://localhost:3090/faces/isvalid", {
			status: 200,
			response: {
				isValid: false
			}
		});
		wrapper.setState({
			nameKey: "56zuFgdeoMqAOuIKe0M4AU",
			currentImage: { key: 1, id: "avLdCFJYHKqWOeagmWq6u", url: "" }
		});

		validateAnswer("incorrectAnswers", done);
	});

	function validateAnswer(answer, done) {
		wrapper
			.find("#id-name-button-comparison")
			.at(0)
			.simulate("click");
		wrapper.update();

		moxios.wait(async () => {
			expect(await wrapper.state(answer)).toEqual(1);
			wrapper.unmount();
			done();
		});
	}
});

afterEach(() => {
	moxios.uninstall();
});
