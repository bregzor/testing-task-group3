import Enzyme, { shallow, mount } from "enzyme";

import { BrowserRouter } from "react-router-dom";
import ActionPoint from "../ActionPoint";
import UserContextProvider from "../../contexts/UserContextProvider";

import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import React from "react";
Enzyme.configure({ adapter: new Adapter() });

// let wrapper = 4;
// beforeEach(() => {

// })

describe("Test internal link rendering", () => {
  const wrapper = mount(
    <BrowserRouter>
      <UserContextProvider>
        <ActionPoint
          title="Ext title"
          description="test desc"
          top={30}
          left={20}
          linkKind={0}
          linkInternal={{
            getFrontendUrl: "/myFrontendURL",
            title: "My Frontend URL",
          }}
          iconKind={1}
        />
      </UserContextProvider>
    </BrowserRouter>
  );
  it("renders username from context correctly", () => {
    expect(wrapper.find(".internal-link").text()).toContain("johndoe");
  });

  it("render title correclty", () => {
    expect(wrapper.find(".internal-link").text()).toContain("Ext title");
  });

  it("render style, top/left correclty", () => {
    expect(wrapper.find(".internal-link").prop("style")).toHaveProperty(
      "top",
      "30%"
    );
    expect(wrapper.find(".internal-link").prop("style")).toHaveProperty(
      "left",
      "20%"
    );
  });
});

describe("Test external link rendering", () => {
  it("renders a external link href correctly", () => {
    const wrapper = mount(
      <UserContextProvider>
        <ActionPoint
          title="Ext title"
          description="test desc"
          top={0}
          left={0}
          linkKind={1}
          iconKind={1}
          linkExternal={"https://www.google.com"}
        />
      </UserContextProvider>
    );

    expect(wrapper.find(".external-link").prop("href")).toBe(
      "https://www.google.com"
    );
  });

  it("renders link styling correctly, top 30 and left 20", () => {
    const wrapper = mount(
      <UserContextProvider>
        <ActionPoint
          title="Ext title"
          description="test desc"
          top={30}
          left={20}
          linkKind={1}
          iconKind={1}
          linkExternal={"https://www.google.com"}
        />
      </UserContextProvider>
    );

    expect(wrapper.find(".external-link").prop("style")).toHaveProperty(
      "top",
      "30%"
    );
    expect(wrapper.find(".external-link").prop("style")).toHaveProperty(
      "left",
      "20%"
    );
  });

  it("renders title in link correctly", () => {
    const wrapper = mount(
      <UserContextProvider>
        <ActionPoint
          title="Ext title"
          description="test desc"
          top={0}
          left={0}
          linkKind={1}
          iconKind={1}
          linkExternal={"https://www.google.com"}
        />
      </UserContextProvider>
    );

    expect(wrapper.find(".external-link").text()).toBe("Ext title");
  });
});

describe("Test icon cssClasses per iconKind", () => {
    
  let wrapper;
  let iconCount = 0;
  beforeEach(() => {
    wrapper = mount(
      <UserContextProvider>
        <ActionPoint
          title="Ext title"
          top={0}
          left={0}
          iconKind={iconCount}
          linkKind={1}
        />
      </UserContextProvider>
    );
    iconCount++;
  });

  it("renders icon-kind = 0 icon-CSS-class correctly", () => {
    expect(wrapper.find("a").hasClass("links__icon--")).toBe(true);
  });

  it("renders icon-kind = 1 icon-CSS-class correctly", () => {
    expect(wrapper.find("a").hasClass("links__icon--image")).toBe(true);
  });

  it("renders icon-kind = 2 icon-CSS-class correctly", () => {
    expect(wrapper.find("a").hasClass("links__icon--video")).toBe(true);
  });

  it("renders icon-kind = 3 icon-CSS-class correctly", () => {
    expect(wrapper.find("a").hasClass("links__icon--link")).toBe(true);
  });

  it("renders icon-kind = 4 icon-CSS-class correctly", () => {
    expect(wrapper.find("a").hasClass("links__icon--document")).toBe(true);
  });
});

describe("Test actionPoint rendering", () => {
  it("renders a external link correctly", () => {
    const wrapper = mount(
      <UserContextProvider>
        <ActionPoint
          title="Ext title"
          description="test desc"
          top={0}
          left={0}
          linkKind={1}
          iconKind={1}
          linkExternal={"https://www.google.com"}
        />
      </UserContextProvider>
    );

    expect(wrapper.find("a").hasClass("external-link")).toBe(true);
  });

  it("renders a internal link", () => {
    const wrapper = mount(
      <UserContextProvider>
        <BrowserRouter>
          <ActionPoint
            title="Ext title"
            description="test desc"
            top={0}
            left={0}
            linkKind={0}
            iconKind={1}
            linkInternal={{
              getFrontendUrl: "/myFrontendURL",
              title: "My Frontend URL",
            }}
          />
        </BrowserRouter>
      </UserContextProvider>
    );

    expect(wrapper.find(".internal-link").exists()).toBe(true);
  });

  it("renders a modal link correctly", () => {
    const wrapper = mount(
      <UserContextProvider>
        <ActionPoint
          title="Ext title"
          description="test desc"
          top={0}
          left={0}
          linkKind={2}
          iconKind={1}
        />
      </UserContextProvider>
    );

    expect(wrapper.find("a").hasClass("modal-link")).toBe(true);
  });

  it("renders a document link correctly", () => {
    const wrapper = mount(
      <UserContextProvider>
        <ActionPoint
          title="Ext title"
          description="test desc"
          top={0}
          left={0}
          linkKind={3}
          iconKind={1}
          linkExternal={"https://www.google.com"}
        />
      </UserContextProvider>
    );

    expect(wrapper.find("a").hasClass("document-link")).toBe(true);
  });
});
