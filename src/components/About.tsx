/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-one-expression-per-line */
import { Title, Text, List, Blockquote, Container, ThemeIcon } from '@mantine/core';
import { IconAlertCircle, IconCircleCheck, IconCurrentLocation, IconDeviceLaptop, IconFilePencil, IconFileUpload, IconInfoCircle, IconRoute, IconSend } from '@tabler/icons-react';
import styles from './About.module.css'

export const About = () => (

    <Container size="lg" >
        <Title
            mb="md"
            order={1}
        >
            About FIRMS Explorer
        </Title>
        <Text size="md">
            FIRMS Explorer is a cutting-edge application designed for <b>rapid fire recognition and data collection using ESP modules with LoRa (Long Range) communication technology</b>. This innovative solution combines hardware and software to enhance fire detection and response efforts, <b>
                while also involving the community</b> in fire reporting process.

        </Text>

        <Title
            order={2}
            mt="xl"
        >
            How to report fire
        </Title>
        <Text size="md">
            <Blockquote
                color="indigo"
                icon={<IconInfoCircle />}
                mt="xl"
                mb="xl"
            >
                If you want to allow access location make sure you are sending this report from from the place where the fire is. Othervise uncheck this option and the location will be taken from image details.
            </Blockquote>

            <Text
                mb="md"
                size="xl"
            >To report a fire using the FIRMS Explorer application, follow these steps:</Text>
            <List>
                <List.Item
                    className={styles['list-item']}
                    icon={(
                        <ThemeIcon
                            color="indigo"
                            size={24}
                            radius="xl"
                        >
                            <IconDeviceLaptop size="1rem" />
                        </ThemeIcon>
                    )}
                >
                    Open the Application: Launch the FIRMS Explorer application on your laptop or mobile device.
                </List.Item>
                <List.Item
                    className={styles['list-item']}
                    icon={(
                        <ThemeIcon
                            color="indigo"
                            size={24}
                            radius="xl"
                        >
                            <IconRoute size="1rem" />
                        </ThemeIcon>
                    )}
                >
                    Navigate to "Report Fire Tab": In the application's main menu or navigation bar, locate and select the "Report Fire" tab. This tab is where you can initiate the fire reporting process.
                </List.Item>
                <List.Item
                    className={styles['list-item']}
                    icon={(
                        <ThemeIcon
                            color="indigo"
                            size={24}
                            radius="xl"
                        >
                            <IconFileUpload size="1rem" />
                        </ThemeIcon>
                    )}
                >
                    Upload an Image: Tap the "Upload Image" button. This will allow you to access your device's camera or image gallery. Capture a photo of the fire or select an existing image related to the fire incident.
                </List.Item>
                <List.Item
                    className={styles['list-item']}
                    icon={(
                        <ThemeIcon
                            color="indigo"
                            size={24}
                            radius="xl"
                        >
                            <IconFilePencil size="1rem" />
                        </ThemeIcon>
                    )}
                >
                    Optional Description: If desired, you can include additional information by writing a description in the provided text box. This description could include details about the fire, any actions you have taken, or notifications you have made to authorities. Providing context can be helpful for responders.
                </List.Item>
                <List.Item
                    className={styles['list-item']}
                    icon={(
                        <ThemeIcon
                            color="indigo"
                            size={24}
                            radius="xl"
                        >
                            <IconCurrentLocation size="1rem" />
                        </ThemeIcon>
                    )}
                >
                    Enable Location Access: Before submitting the report, ensure that you have allowed the application to access your device's location. This is crucial for accurately pinpointing the fire's location on the map and facilitating a rapid response.
                </List.Item>
                <List.Item
                    className={styles['list-item']}
                    icon={(
                        <ThemeIcon
                            color="indigo"
                            size={24}
                            radius="xl"
                        >
                            <IconSend size="1rem" />
                        </ThemeIcon>
                    )}
                >
                    Submit the Report: Once you have attached an image, added a description (if necessary), and enabled location access, tap the "Submit" or "Report" button. This action sends the fire report to the system.
                </List.Item>
                <List.Item
                    className={styles['list-item']}
                    icon={(
                        <ThemeIcon
                            color="indigo"
                            size={24}
                            radius="xl"
                        >
                            <IconCircleCheck size="1rem" />
                        </ThemeIcon>
                    )}
                >
                    Confirmation: After submitting the report, you should receive a confirmation message indicating that the report has been successfully sent. The report will be processed, and the fire incident will be recorded on the system's dashboard.
                </List.Item>
            </List>
        </Text>
        <Title
            order={2}
            mt="xl"
        >
            Why reporting fire is so important
        </Title>
        <Text
            mt="md"
            size="md"
        >
            Reporting wildfires is vital for public safety, enabling rapid responses and evacuations. Early detection aids in containment, reducing overall damage and resource allocation. It safeguards the environment, curbing ecological harm. It protects public health by issuing air quality alerts, aids property owners, and facilitates insurance claims and recovery efforts. Data from reports informs prevention strategies and investigations. Reporting also raises community awareness about wildfire risks and preparedness, fostering a safer environment for all.
        </Text>

        <Blockquote
            color="red"
            icon={<IconAlertCircle />}
            mt="xl"
            mb="xl"
        >
            Remember early fire report will reduce the risk of spread of fire, preservation of forests from burning and save the lives of many people.
        </Blockquote>
    </Container>

);
