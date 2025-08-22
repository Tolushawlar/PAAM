import Button from "../../UI/Button";
import CertificateImage from "../../assets/downloadCertificate.svg"


function UserDownloadCertificate() {
  
    return (
        <div className="space-y-12 p-6 w-full">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Download Your Certificate</h1>
                <p className="text-gray-600">Congratulations on completing the training program! You can download your certificate below.</p>
            </div>

            {/* Publications Section */}
            <div className="space-y-6">
               <div className="flex bg-white rounded-lg shadow p-6 ">
                 <div className="mr-4">
                    <img src={CertificateImage} alt="Certificate Image" />
                </div>
                <div>
                    <h3 className="font-medium text-gray-900">Certificate of Completion</h3>
                    <p className="text-sm text-gray-600">This certificate confirms your successful completion of the training program.</p>
                </div>
               </div>

               <div>
                <p className="text-sm text-gray-600 mb-4 ">Your certificate is available in PDF format. If you encounter any issues, please contact support.</p>
                <Button title="Download Certificate"/>
               </div>
            </div>

           





        </div>
    );
}

export default UserDownloadCertificate;