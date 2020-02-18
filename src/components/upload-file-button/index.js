import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const UploadFileButton = ({
  upload,
  label = 'import',
  id = 'upload-file',
  accept = '.csv,.vcf',
  ...rest
}) => (
  <span style={{ display: 'inline-box', padding: '4px 8px' }}>
    <input
      accept={accept}
      id={id}
      onChange={e => {
        const file = e.target.files[0]
        if (file) {
          const fd = new FormData()
          fd.append('file', file)
          upload(fd)
        }
        return false
      }}
      style={{ display: 'none' }}
      type="file"
      {...rest}
    />
    <StyledLabel htmlFor={id}>{label}</StyledLabel>
  </span>
)

UploadFileButton.propTypes = {
  accept: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  upload: PropTypes.func.isRequired,
}

const StyledLabel = styled.label`
  text-transform: uppercase;
  font-weight: 500;
  cursor: pointer;
`

export default UploadFileButton
