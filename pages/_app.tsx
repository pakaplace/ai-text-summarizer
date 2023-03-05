import "../styles/globals.css";
import type { AppProps } from "next/app";
import { theme as proTheme } from "@chakra-ui/pro-theme";
import { extendTheme, theme as baseTheme } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/inter/variable.css";
import { AppProvider } from "../hooks/useAppContext";
import { AppNavbar } from "../components/navbar";

export const theme = extendTheme(
  {
    colors: { ...baseTheme.colors, brand: baseTheme.colors.blue },
  },
  proTheme
);
export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <ChakraProvider theme={theme}>
        <AppNavbar></AppNavbar>
        <Component {...pageProps} />
      </ChakraProvider>
    </AppProvider>
  );
}
