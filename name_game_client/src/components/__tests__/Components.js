import React from "react";
import { shallow } from "enzyme";
import moxios from "moxios";

import Welcome from "components/Welcome.js";
import localStorage from "utils/localStorage.js";

let wrapper;
let defaultTime;
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
					}
				],
				images: [
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
	wrapper = shallow(<Welcome />);
});

describe("Welcome Unit Test", () => {
	it("should render a form", () => {
		expect(wrapper.find("Form").length).toEqual(1);
	});
	it("should render card", () => {
		expect(wrapper.find("Card").length).toEqual(1);
	});
	it("should render image", () => {
		expect(wrapper.find("Image").length).toEqual(1);
	});
	it("should render buttons", () => {
		expect(wrapper.find("Button").length).toEqual(3);
	});
	it("should render dropdown menu", () => {
		expect(wrapper.find("Dropdown").length).toEqual(1);
	});
	it("should render pagination menu", () => {
		expect(wrapper.find("Pagination").length).toEqual(1);
	});
});

afterEach(() => {
	moxios.uninstall();
});
