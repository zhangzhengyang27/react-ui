import React from 'react'
import { AiOutlineEdit } from '../icons'
import { Tooltip } from '@xiaoye-react/ui'

import classes from './EditButton.module.css'

// dumi frontmatter.filename 相对于 apps/docs，需带上该前缀才能指向仓库内的真实文件
const branchUrl = 'https://github.com/zhangzhengyang27/react-ui/edit/main/apps/docs/'

export interface EditButtonProps {
    title: React.ReactNode
    filename?: string
}

const EditButton: React.FC<EditButtonProps> = ({ title, filename }) => {
    if (!filename) {
        return null
    }
    return (
        <Tooltip label={title}>
            <a
                className={classes.editButton}
                href={`${branchUrl}${filename}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <AiOutlineEdit />
            </a>
        </Tooltip>
    )
}

export default EditButton
