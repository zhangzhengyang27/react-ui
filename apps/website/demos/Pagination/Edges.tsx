'use client'

import { Pagination } from '@react-ui/ui'

export default function PaginationEdgesDemo() {
    return <Pagination total={20} withEdges withControls={false} siblings={2} boundaries={2} />
}
