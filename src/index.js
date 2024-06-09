import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@kfonts/bm-jua-otf";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const queryClient = new QueryClient();

// 2. Update the breakpoints as key-value pairs
const breakpoints = {
  base: "0px",
  sm: "700px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
};

const sizeValue = {
  desktop_header_height: "74px",
  mobile_header_height: "60px",
  large_screen_max_page_width: "1230px",
  large_screen_max_width: "620px",
  medium_screen_max_width: "520px",
  desktop_page_horizontal_padding: "24px",
  small_screen_nav_height: "68px",
  threadline_column_width: "48px",
  user_list_item_padding: "16px",
  search_page_width: "572px",
};

const sizes = {
  ...sizeValue,
};
const space = {
  ...sizeValue,
};
const fonts = {
  heading: `"배달의민족 주아 OTF", "배달의민족주아OTF", "bm-jua-otf", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  body: `"배달의민족 주아 OTF", "배달의민족주아OTF", "bm-jua-otf", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
};

const styles = {
  global: (props) => ({
    html: {
      overflowY: "scroll !important",
      // marginRight: "-17px",
    },
    body: {
      // fontFamily: "body",
      // color: mode("gray.800", "whiteAlpha.900")(props),
      // bg: mode("white", "gray.800")(props),
      // lineHeight: "base",
      // fontSize: "15px",
      textUnderlinePosition: "under",
      // overflowY: "scroll",
    },
    // 'body[data-scroll-locked]': {
    //   marginRight:"0px !important"
    // }
  }),
};

const fontWeights = {
  hairline: 100,
  thin: 200,
  light: 300,
  normal: 400,
  medium: 400,
  semibold: 400,
  bold: 400,
  extrabold: 400,
  black: 400,
};
// 3. Extend the theme
const theme = extendTheme({
  breakpoints,
  sizes,
  space,
  fonts,
  styles,
  fontWeights,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
