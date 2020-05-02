import data from './sample_data';

const frameworks = new Map([["MACE", ["CPU", "OpenCL"]], ["SNPE", ["CPU", "GPU", "GPU16", "DSP"]], ["MNN", ["CPU", "OpenCL", "Vulkan", "OpenGL"]], ["TFLite", ["CPU", "GPU", "NNAPI"]], ["OpenCV DNN", ["CPU"]], ["TFMobile", ["CPU"]], ["Pytorch", ["CPU"]], ["NCNN", ["CPU", "Vulkan"]]]);

function preprocess(raw) {
    return raw.map(measurment => {
        let data = {
            uid: measurment.uid,
            device: measurment.device.marketName,
            appVersion: measurment.appVersion,
        }
        measurment.results.forEach(result => {
            let fw = result.configuration.framework;
            let type = result.configuration.inferenceType;
            data[fw + " " + type] = result;
        });
        return data;
    });
}

function subscribeToResults(firebase, callback) {
    return firebase.firestore()
        .collection('measurements')
        .onSnapshot(snapshot => {
            let measurements = [];
            snapshot.forEach(doc => {
                measurements.push({ ...doc.data(), doc_id: doc.id });
            });
            callback(frameworks, preprocess(measurements));
        });

    // callback(frameworks, preprocess(data));
    // return () => { };
}

export default subscribeToResults;