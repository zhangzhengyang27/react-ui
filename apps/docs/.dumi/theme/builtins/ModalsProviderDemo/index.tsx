import React from 'react'
import { FiCheck } from '../../icons'
import { Button, Center, Loader, Stack, Text } from '@xiaoye-react/ui'
import { ContextModalProps, ModalsProvider } from '@xiaoye-react/modals'

interface ModalsProviderDemoProps {
    children: React.ReactNode
}

const demonstrationModal = ({ context, id, innerProps }: ContextModalProps<{ modalBody: string }>) => (
    <>
        <Text size="sm">{innerProps.modalBody}</Text>
        <Button fullWidth mt="md" onClick={() => context.closeModal(id)}>
            Close modal
        </Button>
    </>
)

const asyncDemonstrationModal = ({
    context,
    id,
    innerProps
}: ContextModalProps<{ modalBody: string; loading: boolean }>) => (
    <>
        <Stack>
            <Text size="sm">{innerProps.modalBody}</Text>
            <Center>
                {innerProps.loading ? (
                    <Loader size={32} />
                ) : (
                    <FiCheck style={{ width: 32, height: 32, color: 'green' }} />
                )}
            </Center>
        </Stack>
        <Button fullWidth mt="md" disabled={innerProps.loading} onClick={() => context.closeModal(id)}>
            Close modal
        </Button>
    </>
)

const ModalsProviderDemo: React.FC<ModalsProviderDemoProps> = ({ children }) => {
    return (
        <ModalsProvider
            labels={{ confirm: '确认', cancel: '取消' }}
            modals={{ demonstration: demonstrationModal, asyncDemonstration: asyncDemonstrationModal }}
        >
            {children}
        </ModalsProvider>
    )
}

export default ModalsProviderDemo
