import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Avatar,
    Text,
  } from '@chakra-ui/react'

function SenderDetails({sender}) {
     
    const { isOpen, onOpen, onClose } = useDisclosure()

  return (
     <>
      <Avatar  onClick={onOpen} className=' cursor-pointer' name={sender.fullName} src={sender.avatar} />
      <Modal size={"md"} blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className=' text-center'>
            <Avatar size={"xl"}  name={sender.fullName} src={sender.avatar} />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text textAlign={"center"} fontWeight='bold' mb='1rem'>
              {sender.fullName}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
     </>
  )
}

export default SenderDetails