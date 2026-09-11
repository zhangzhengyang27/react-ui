import React from 'react'
import { AiOutlineEdit } from '../icons'
import { Tooltip } from '@xiaoye-react/ui'

import classes from './EditButton.module.css'

const branchUrl = 'https://github.com/zhangzhengyang27/react-ui/edit/main/'

export interface EditButtonProps {
    title: React.ReactNode
    filename?: string
}

const EditButton: React.FC<EditButtonProps> = ({ title, filename }) => {
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
