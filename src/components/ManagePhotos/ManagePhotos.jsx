/* eslint-disable no-debugger */
import React, { useState, useEffect, forwardRef } from 'react';
import { Card, Container, Grid, Button, Alert, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  deletePhotosRequest,
  getPhotosRequest,
  uploadFileRequest
} from '../../redux/modules/managePhotoSlice';
import {
  checkIfUserPhotoDeleted,
  getMessage,
  getPhotos,
  getIsUploaded,
  getIsDeleted
} from '../../redux/selectors/managePhotoSelector';
import ManagePhotoStyles from './managePhotos.module.scss';
import { isEmpty } from 'lodash';
import { getUID } from '../../redux/selectors/loginSelector';
import SessionStorageHandler from '../../utils/SessionStorageHandler';
import Loader from '../../commons/Loader/Loader';
import { getUId } from '../../redux/selectors/userRegisterationDetails';

const ManagePhotos = () => {
  const dispatch = useDispatch();
  const userPhotos = useSelector(getPhotos);
  const isUploaded = useSelector(getIsUploaded);
  const isDeleted = useSelector(getIsDeleted);
  const messageError = useSelector(getMessage);
  const userIdFromUserDetails = useSelector(getUId);
  const error = useSelector((state) => state.userPhotos.isError);
  const IsLoadingImages = useSelector((state) => state.userPhotos.isLoading);
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [progressInfos, setProgressInfos] = useState({ val: [] });
  const [message, setMessage] = useState([]);
  const [fileInfos, setFileInfos] = useState([]);
  const [fileDeleteClicked, setFileDeleteClicked] = useState(false);
  const [uploadClicked, setUploadClicked] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const userId = SessionStorageHandler.getKeyFromStorage('userId');
  const [sbOpen, setSbOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  let fileSize = '';
  console.log(uploadClicked);
  if (selectedFiles && selectedFiles?.[0].size > 10000000) {
    fileSize = true;
  } else {
    fileSize = false;
  }

  const clearSelectedFile = () => {
    if (isUploaded === true) {
      setSelectedFiles('');
    }
  };
  if (isUploaded === true) {
    () => setSelectedFiles('');
  }

  const checkIsUserImageDelete = useSelector(checkIfUserPhotoDeleted);
  useEffect(() => {
    debugger;
    if (userIdFromUserDetails) {
      dispatch(getPhotosRequest({ userId: userIdFromUserDetails }));
    } else {
      dispatch(getPhotosRequest({ userId: useSelector(getUID) }));
    }
  }, [userIdFromUserDetails]);

  useEffect(() => {
    if (isUploaded) {
      dispatch(
        getPhotosRequest({
          userId: userIdFromUserDetails
        })
      );
      clearSelectedFile();
    }
  }, [isUploaded]);

  useEffect(() => {
    if (isDeleted) {
      dispatch(
        getPhotosRequest({
          userId: userIdFromUserDetails
            ? userIdFromUserDetails
            : '0087a6bc-4b5c-458a-b27b-6eca5301c54c'
        })
      );
    }
  }, [isDeleted]);

  useEffect(() => {
    if (userPhotos) {
      setFileInfos(userPhotos);
    }
  }, [userPhotos]);

  const selectFiles = (event) => {
    setSelectedFiles(event.target.files);
    if (isUploaded === true) {
      setSelectedFiles();
    }
    setProgressInfos({ val: [] });
    setUploadClicked(true);
  };

  const uploadFiles = () => {
    const payload = new FormData();
    const files = Array.from(selectedFiles);
    payload.append('userId', userId ? userId : '0087a6bc-4b5c-458a-b27b-6eca5301c54c');
    files.forEach((file) => {
      payload.append(file.name, file);
    });
    setUploadOpen(true);
    dispatch(uploadFileRequest(payload));
    setMessage([]);
  };

  const handleChange = (id) => {
    dispatch(deletePhotosRequest(id));
    setFileDeleteClicked(true);
  };

  useEffect(() => {
    if (!isEmpty(messageError) && fileDeleteClicked) {
      setResponseMessage(messageError);
      setSbOpen(true);
    }
  }, [checkIsUserImageDelete, fileDeleteClicked]);

  return (
    <Container className={ManagePhotoStyles['container']}>
      {progressInfos &&
        progressInfos.val.length > 0 &&
        progressInfos.val.map((progressInfo, index) => (
          <div className="mb-2" key={index}>
            <span>{progressInfo.fileName}</span>
            <div className="progress">
              <div
                className="progress-bar progress-bar-info"
                role="progressbar"
                aria-valuenow={progressInfo.percentage}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: progressInfo.percentage + '%' }}>
                {progressInfo.percentage}%
              </div>
            </div>
          </div>
        ))}
      {fileInfos?.length < 6 && (
        <div className="row my-3">
          <div className="col-8">
            <label className="btn btn-default p-0">
              <input type={isUploaded ? '' : 'file'} multiple onChange={selectFiles} />
            </label>
          </div>

          <div className="col-4">
            <button
              className="btn btn-success btn-sm"
              disabled={!selectedFiles}
              onClick={uploadFiles}>
              Upload
            </button>
          </div>
        </div>
      )}
      {message.length > 0 && (
        <div className="alert alert-secondary" role="alert">
          <ul>
            {message.map((item, i) => {
              return <li key={i}>{item}</li>;
            })}
          </ul>
        </div>
      )}

      {IsLoadingImages ? (
        <Loader />
      ) : (
        <div className="card">
          <div className="card-header">List of Files</div>
          <ul className="list-group list-group-flush">
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 4, md: 4 }}
              className={ManagePhotoStyles['image-wrapper']}>
              {fileInfos &&
                (fileInfos || []).map((file, index) => {
                  return (
                    <Grid key={index} item xs={6} sm={3}>
                      <Card className={ManagePhotoStyles['image-card']}>
                        <img src={file.ImageUrl} className={ManagePhotoStyles['image-style']} />
                        <Button variant="outlined" onClick={() => handleChange(file.Id)}>
                          Delete Image
                        </Button>
                      </Card>
                    </Grid>
                  );
                })}
            </Grid>
          </ul>
        </div>
      )}

      {error && (
        <Snackbar
          open={uploadOpen}
          onClose={() => {
            setUploadClicked(false), setUploadOpen(false);
          }}
          autoHideDuration={2000}>
          <AlertBox severity={error === true ? 'error' : ''} sx={{ width: '100%' }}>
            {error && messageError}
          </AlertBox>
        </Snackbar>
      )}
      {fileSize && (
        <Snackbar
          open={uploadOpen}
          onClose={() => {
            setUploadClicked(false), setUploadOpen(false);
          }}
          autoHideDuration={1000}>
          <AlertBox severity={fileSize === true ? 'error' : ''} sx={{ width: '100%' }}>
            {fileSize === true ? 'File Size Exceeded' : ''}
          </AlertBox>
        </Snackbar>
      )}
      {isUploaded === true && (
        <Snackbar
          open={uploadOpen}
          onClose={() => {
            setUploadClicked(false), setUploadOpen(false);
          }}
          autoHideDuration={2000}>
          <AlertBox severity={isUploaded === true ? 'success' : ''} sx={{ width: '100%' }}>
            {isUploaded === true ? 'Upload Successful' : ''}
          </AlertBox>
        </Snackbar>
      )}

      <Snackbar
        open={sbOpen}
        onClose={() => {
          setFileDeleteClicked(false), setSbOpen(false);
        }}
        autoHideDuration={2000}>
        <AlertBox severity={checkIsUserImageDelete ? 'success' : 'error'} sx={{ width: '100%' }}>
          {checkIsUserImageDelete ? 'Deleted Successfully' : responseMessage}
        </AlertBox>
      </Snackbar>
    </Container>
  );
};

export default ManagePhotos;
const AlertBox = forwardRef(function SbAlert(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});
