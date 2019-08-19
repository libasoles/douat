import React, { useState, useCallback, useRef, useEffect } from "react";
import { PermissionsAndroid } from "react-native";
import { captureRef } from "react-native-view-shot";
import CameraRoll from "@react-native-community/cameraroll";

async function saveToAlbum({ captureViewRef, captureOptions, album }) {
  return captureRef(captureViewRef, captureOptions)
    .then(uri => {
      CameraRoll.save(uri, { type: "photo", album }).then(
        console.log,
        console.error
      );
    })
    .catch(error => console.error("Oops, snapshot failed", error));
}

function alertUserAboutSettings() {
  alert(
    "You disabled this functionality ¯\\_(ヅ)_/¯. Please go to Settings > Applications and grant storage permission"
  );
}

function usePermissionDialog({
  onPermissionGranted,
  onPermissionDenied = () => {},
  onPermissionDeniedForEver = () => {},
  onActionNotAccessible = () => {}
}) {
  const [shouldAskForPermission, setShouldAskForPermissionFlag] = useState(
    false
  );
  const [permissionState, setPermissionState] = useState(
    PermissionsAndroid.RESULTS.DENIED
  );

  useEffect(() => {
    (async function askPermission() {
      if (!shouldAskForPermission) {
        return;
      }

      setShouldAskForPermissionFlag(false);

      const alreadyGranted =
        permissionState === PermissionsAndroid.RESULTS.GRANTED ||
        (await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        ));

      if (
        !alreadyGranted &&
        permissionState === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
      ) {
        onActionNotAccessible();
        return;
      }

      if (alreadyGranted) {
        onPermissionGranted();
        return;
      }

      const newState = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );

      if (newState === PermissionsAndroid.RESULTS.GRANTED) {
        onPermissionGranted();
      } else if (newState === PermissionsAndroid.RESULTS.DENIED) {
        onPermissionDenied();
      } else {
        onPermissionDeniedForEver();
      }

      setPermissionState(newState);
    })();
  }, [
    permissionState,
    shouldAskForPermission,
    onPermissionGranted,
    onPermissionDenied,
    onPermissionDeniedForEver,
    onActionNotAccessible
  ]);

  return {
    setShouldAskForPermissionFlag
  };
}

function useCapture({
  album = null,
  outputOptions,
  onActionNotAccessible = alertUserAboutSettings
} = {}) {
  const captureViewRef = useRef(null);
  const captureOptions = useRef({
    format: "jpg",
    quality: 0.9,
    ...outputOptions
  });

  // save
  const saveCapture = () => {
    return saveToAlbum({
      album,
      captureViewRef,
      captureOptions
    });
  };

  // ask
  const { setShouldAskForPermissionFlag } = usePermissionDialog({
    onPermissionGranted: saveCapture,
    onActionNotAccessible
  });

  // user event
  const onSaveCapture = useCallback(() => {
    setShouldAskForPermissionFlag(true);
  }, [setShouldAskForPermissionFlag]);

  return {
    captureViewRef,
    onSaveCapture
  };
}

export { useCapture };
