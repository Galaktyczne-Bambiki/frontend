/* eslint-disable react-hooks/exhaustive-deps */

import { Alert, Button, Container, FileButton, Group, Switch, Text, Textarea, Title, Notification } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconInfoCircle, IconCheck, IconX } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef  } from 'react';
import styles from './Report.module.css'
import { FireReportData, FireReportRequest } from '../api/models';
import { reportMutation } from '../api/queries';

export type ReportForm = {
	description: string,
	sendLocalization: boolean,
	lat: null | number,
	lng: null | number,
	file: File | null,
}

export const Report = () => {
    const resetRef = useRef<() => void>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const reportFire = useMutation<void, any, FireReportData>({
        ...reportMutation, onSettled: () => {
            form.reset()
        } },)
    const clearFile = () => {
        form.setFieldValue('file', null)
        resetRef.current?.();
    };
    const form = useForm<ReportForm>({
        initialValues: {
            description: '',
            sendLocalization: true,
            lat: null,
            lng: null,
            file: null,
        },
        validate: {
            file: value => (!value ? 'Fire Image must be uploaded' : null),
        }
    });

    const getNavigation = (position: GeolocationPosition) => {
        form.setFieldValue('lat', position.coords.latitude)
        form.setFieldValue('lng', position.coords.longitude)
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(getNavigation);
    }, [])

    const report = (data: ReportForm) => {
        const preparedData: FireReportRequest = data.sendLocalization ? {
            description: data.description,
            lat: data.lat ?? undefined,
            lng: data.lng ?? undefined
        } : {
            description: data.description,
        }
        if (!data.file) return
        reportFire.mutate({ data: preparedData, file: data.file })
    }

    return (
        <Container size="xl"  >
            {reportFire.isSuccess ?  (
                <Notification
                    className={styles['success-notification']}
                    mb="xl"
                    mt="xl"
                    icon={<IconCheck />}
                    color="teal"
                    title="Success"
                    onClose={ () => reportFire.reset()}
                >
                    The report has beed submitted
                </Notification>
            ) : undefined}

            {reportFire.isError ?  (
                <Notification
                    className={styles['error-notification']}
                    mb="xl"
                    mt="xl"
                    icon={<IconX />}
                    color="red"
                    title="Error"
                    onClose={ () =>  reportFire.reset()}
                >
                    {reportFire.error.errors.File.join(', ')}

                </Notification>
            ) : undefined}

            <form onSubmit={form.onSubmit(report)}>
                <Title
                    mb="xl"
                    order={1}
                >
                    Report fire
                </Title>

                <Group
                    mt="lg"
                >

                    <FileButton
                        resetRef={resetRef}
                        onChange={file => {form.setFieldValue('file', file)}}
                        accept="image/png,image/jpeg"
                    >
                        {props => (
                            <Button
                                color="indigo"
                                {...props}
                            >
                                Upload fire image
                            </Button>
                        )}
                    </FileButton>
                    <Button
                        disabled={!form.values.file}
                        color="red"
                        onClick={clearFile}
                    >
                        Reset
                    </Button>

                    {form.values.file && (
                        <Text
                            size="sm"
                            ta="center"
                            mt="sm"
                        >
                            Picked file:
                            {' '}
                            {form.values.file.name}
                        </Text>
                    )}
                </Group>
                <Text
                    c="red"
                    size="sm"
                    mt="sm"
                >
                    {form.errors.file}
                </Text>

                <Textarea
                    mt="lg"
                    {...form.getInputProps('description')}
                    label="Additional Information about fire report"
                    placeholder="eg. fire detials, any action taken or notifications you have made to authorities"
                    autosize
                    minRows={3}
                />

                <Alert
                    mt="xl"
                    mb="md"
                    variant="light"
                    color="yellow"
                    title="Localization"
                    icon={<IconInfoCircle />}
                >
                    Check this switch if you are currently at place where the fire is. Otherwise localization of fire will be retrived from image.
                </Alert>
                <Switch
                    defaultChecked
                    {...form.getInputProps('sendLocalization')}
                    color="indigo"
                    label="Send localization from device"
                />

                <Button
                    mt="xl"
                    color="indigo"
                    type="submit"
                >
                    Report
                </Button>
            </form>
        </Container>

    )
};

