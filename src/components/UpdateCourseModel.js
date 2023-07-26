import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'reactstrap';

const UpdateCourseModel = ({ isOpen, toggle, courseToUpdate, updateCourse }) => {
  const [newTitle, setNewTitle] = useState(courseToUpdate.title);
  const [newDescription, setNewDescription] = useState(courseToUpdate.decription);

  const handleUpdate = () => {
    updateCourse(courseToUpdate.id, newTitle, newDescription);
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Update Course</ModalHeader>
      <ModalBody>
        <Input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Enter new title"
        />
        <Input
          type="textarea"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Enter new description"
        />
      </ModalBody>
      <ModalFooter>
        <Button color="warning" onClick={handleUpdate}>
          Update
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UpdateCourseModel;
