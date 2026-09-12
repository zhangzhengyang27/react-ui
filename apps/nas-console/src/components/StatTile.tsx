import { Box, Group, Paper, Skeleton, Text } from '@xiaoye-react/ui'
import { Sparkline } from '@xiaoye-react/charts'

export interface StatTileProps {
    label: string
    value?: string | number
    /** 值下方的补充说明（环比、日期范围等） */
    hint?: string
    /** 走势数据（可选） */
    sparkline?: number[]
    sparklineColor?: string
    loading?: boolean
}

export function StatTile({ label, value, hint, sparkline, sparklineColor, loading }: StatTileProps) {
    return (
        <Paper withBorder radius="md" p="md">
            <Text size="xs" c="dimmed" mb={4}>
                {label}
            </Text>
            {loading ? (
                <Skeleton height={26} width="60%" radius="sm" />
            ) : (
                <Group justify="space-between" align="flex-end" wrap="nowrap" gap="xs">
                    <Text fw={700} fz="xl" lh={1.2}>
                        {value ?? '—'}
                    </Text>
                    {sparkline && sparkline.length > 1 && (
                        <Box w={72} h={28} flex="0 0 auto">
                            <Sparkline data={sparkline} color={sparklineColor} strokeWidth={1.5} />
                        </Box>
                    )}
                </Group>
            )}
            {hint && !loading && (
                <Text size="xs" c="dimmed" mt={4}>
                    {hint}
                </Text>
            )}
        </Paper>
    )
}
