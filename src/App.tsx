// eslint-disable-next-line import/extensions
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';

export const App = () => (
    <MantineProvider theme={theme}>
        App
    </MantineProvider>
);
