import React, { useState, useEffect } from 'react';
import { Course } from './Course';
import axios from 'axios';
import { toast } from 'react-toastify';
import UpdateCourseModel from './UpdateCourseModel';

export const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [courseToUpdate, setCourseToUpdate] = useState(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    document.title = 'All Courses';
    getAllCoursesFromServer();
  }, []);

  const getAllCoursesFromServer = () => {
    axios
      .get("http://localhost:5000/courses")
      .then((response) => {
        console.log(response.data);
        toast.success('Courses have been loaded', {
          position: 'bottom-center'
        });
        setCourses(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Something went wrong', {
          position: 'bottom-center'
        });
      });
  };
  const removeDeletedCourse = (id) => {
    setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
  };
  const updateCourses = (id, newTitle, newDescription) => {
    axios
      .put(`http://localhost:5000/courses/${id}`, {
        title: newTitle,
        description: newDescription
      })
      .then((response) => {
        toast.success('Course updated successfully');
        setCourses((prevCourses) =>
          prevCourses.map((course) =>
            course.id === id ? { ...course, title: newTitle, decription: newDescription } : course
          )
        );
      })
      .catch((error) => {
        toast.error('Course not updated! Server problem');
      });
  };
  const setCourseToUpdateHandler = (course) => {
    setCourseToUpdate(course);
    setUpdateModalOpen(true); // Open the modal for updating
  };

  return (
    <div>
      <h1>All Courses</h1>
      <p>List of Courses are as follows</p>
      {courses.length > 0 ? (
        courses.map((item) => (
          <Course key={item.id} course={item} update={() => setCourseToUpdateHandler(item)} removeCourse={removeDeletedCourse} />
        ))
      ) : (
        <p>No Courses</p>
      )}

      {courseToUpdate && (
        <UpdateCourseModel
          isOpen={isUpdateModalOpen}
          toggle={() => setUpdateModalOpen(!isUpdateModalOpen)}
          courseToUpdate={courseToUpdate}
          updateCourse={(id, newTitle, newDescription) => {
            updateCourses(id, newTitle, newDescription);
            setUpdateModalOpen(false); // Close the modal after updating
          }}
        />
      )}
    </div>
  );
};
