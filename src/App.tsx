import '@mantine/core/styles.css';
import 'leaflet/dist/leaflet.css'
import { AppShell, Burger, Group, MantineProvider, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconMap2, IconInfoSquare, IconReportAnalytics } from '@tabler/icons-react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import styles from './App.module.css'
import FireIcon from './assets/fire.svg?react'
import { theme } from './theme';

export const App = () => {
    const [opened, { toggle }] = useDisclosure();
    const location = useLocation();

    return (
        <MantineProvider
            theme={theme}
            defaultColorScheme="auto"
        >
            <AppShell
                header={{ height: { base: 60, md: 70, lg: 80 } }}
                navbar={{
                    width: { base: 200, md: 200, lg: 300 },
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
                <AppShell.Navbar
                    p="md"
                    zIndex={1001}
                >
                    <NavLink
                        to="/"
                        component={Link}
                        active={location.pathname === '/'}
                        label="Map"
                        onClick={toggle}
                        leftSection={(
                            <IconMap2
                                stroke={1.5}
                            />
                        )}
                    />
                    <NavLink
                        to="/about"
                        active={location.pathname === '/about'}
                        component={Link}
                        label="About"
                        onClick={toggle}
                        leftSection={(
                            <IconInfoSquare
                                stroke={1.5}
                            />
                        )}
                    />
                    <NavLink
                        to="/report"
                        active={location.pathname === '/report'}
                        component={Link}
                        label="Report fire"
                        onClick={toggle}
                        leftSection={(
                            <IconReportAnalytics
                                stroke={1.5}
                            />
                        )}
                    />
                </AppShell.Navbar>
                <AppShell.Main className={styles.main}>
                    <div className={styles.mainWrapper}>
                        <Outlet />
                    </div>
                </AppShell.Main>
            </AppShell>
        </MantineProvider>
    );
}
