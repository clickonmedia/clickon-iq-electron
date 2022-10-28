import React from "react";
import ReactDOM from "react-dom";
import cx from "classnames";
import useConnect from "./js/useConnect";
import controlActionFromFile from "./js/control";

const browserWindowId = (function () {
  return new URL(location.href).searchParams.get("browserWindowId") || "";
})();
const controlAction = controlActionFromFile({ browserWindowId });

const IconLoading = () => (
  <svg
    version="1.1"
    className="icon-loading"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 40 40"
    enableBackground="new 0 0 40 40"
    xmlSpace="preserve"
  >
    <path
      opacity="0.2"
      fill="currentColor"
      d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
    />
    <path
      fill="currentColor"
      d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z"
    >
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="rotate"
        from="0 20 20"
        to="360 20 20"
        dur="0.618s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);

const IconPlus = () => (
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="plus"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" />
    <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" />
  </svg>
);

class ProxyIpTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title || "",
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.title !== this.props.title) {
      this.setState({ title: nextProps.title });
    }
  }

  render() {
    return (
      <div className="ip-title-container">
        <a className="ip-title">{this.state.title}</a>
      </div>
    );
  }
}

function Control() {
  const { tabs, tabIDs, activeID } = useConnect({ browserWindowId });

  const { proxyTitle } = tabs[activeID] || {};
  const close = (e, id) => {
    e.stopPropagation();
    controlAction.sendCloseTab(id);
  };
  const newTab = () => {
    controlAction.sendNewTab();
  };
  const switchTab = (id) => {
    controlAction.sendSwitchTab(id);
  };

  return (
    <div className="container">
      <div className="tabs">
        <>
          {tabIDs.map((id, index) => {
            // eslint-disable-next-line no-shadow
            const { isLoading, favicon } = tabs[id] || {};
            return (
              <div
                key={id}
                className={cx("tab", { active: id === activeID })}
                onClick={() => switchTab(id)}
                onDoubleClick={(e) => {
                  close(e, id);
                }}
              >
                {isLoading ? (
                  <IconLoading />
                ) : (
                  !!favicon && (
                    <img
                      style={{borderRadius: '50%'}}
                      data-tip
                      data-for="title"
                      src={favicon}
                      width="35"
                      alt=""
                    />
                  )
                )}
              </div>
            );
          })}
          <div className="plus-icon" type="plus" onClick={newTab}>
            <IconPlus />
          </div>
        </>
      </div>
      {proxyTitle ? <ProxyIpTitle title={proxyTitle} /> : ""}
    </div>
  );
}

// eslint-disable-next-line no-undef
ReactDOM.render(<Control />, document.getElementById("app"), () => {});
