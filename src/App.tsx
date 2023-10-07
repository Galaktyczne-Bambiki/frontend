import '@mantine/core/styles.css';
import { AppShell, Burger, Group, MantineProvider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import FireIcon from './assets/fire.svg?react'
import { theme } from './theme';

export const App = () => {
    const [opened, { toggle }] = useDisclosure();

    return (
        <MantineProvider theme={theme}>
            <AppShell
                header={{ height: { base: 60, md: 70, lg: 80 } }}
                navbar={{
                    width: { base: 200, md: 300, lg: 400 },
                    breakpoint: 'sm',
                    collapsed: { mobile: !opened },
                }}
                padding="md"
            >
                <AppShell.Header>
                    <Group
                        h="100%"
                        px="md"
                    >
                        <Burger
                            opened={opened}
                            onClick={toggle}
                            hiddenFrom="sm"
                            size="sm"
                        />
                        <FireIcon />
                        <b>
                            FIRMS Explorer
                        </b>
                    </Group>
                </AppShell.Header>
                <AppShell.Navbar p="md" />
                <AppShell.Main />
            </AppShell>
        </MantineProvider>
    );
}
