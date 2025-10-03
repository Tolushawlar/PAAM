import { useState } from "react";
import { useTranslation } from 'react-i18next';
import InputField from "../../UI/InputField";
import Button from "../../UI/Button";

function CertificateVerification() {
    const { t } = useTranslation();
    const [certificateNumber, setCertificateNumber] = useState("");
    const [verificationResult, setVerificationResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const mockCertificates = [
        {
            certificateNumber: "CERT-2024-001",
            userName: "Olivia Bennett",
            courseName: "Foundations of Christian Discipleship",
            issueDate: "March 15, 2024",
            status: "Valid"
        },
        {
            certificateNumber: "CERT-2024-002", 
            userName: "John Smith",
            courseName: "Personal Growth & Spiritual Practices",
            issueDate: "February 28, 2024",
            status: "Valid"
        }
    ];

    const handleVerify = () => {
        if (!certificateNumber.trim()) return;
        setIsLoading(true);
        
        setTimeout(() => {
            const certificate = mockCertificates.find(
                cert => cert.certificateNumber.toLowerCase() === certificateNumber.toLowerCase()
            );
            setVerificationResult(certificate || { status: "Invalid" });
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="p-6 w-full space-y-8">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{t('certificateVerification')}</h1>
                <p className="text-gray-600 dark:text-gray-400">{t('enterCertificateDesc')}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <div className="space-y-4">
                    <InputField
                        label={t('certificateNumber')}
                        placeholder={t('enterCertificateNumber')}
                        value={certificateNumber}
                        onChange={(e) => setCertificateNumber(e.target.value)}
                        required
                    />
                    <Button 
                        title={isLoading ? t('verifying') : t('verifyCertificate')}
                        onClick={handleVerify}
                    />
                </div>
            </div>

            {verificationResult && (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">{t('verificationResult')}</h2>
                    
                    {verificationResult.status === "Valid" ? (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-green-600 font-semibold">{t('certificateValid')}</span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-600 text-sm">{t('certificateNumber')}</p>
                                    <p className="font-medium">{verificationResult.certificateNumber}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">{t('holderName')}</p>
                                    <p className="font-medium">{verificationResult.userName}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">{t('courseName')}</p>
                                    <p className="font-medium">{verificationResult.courseName}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm">{t('issueDate')}</p>
                                    <p className="font-medium">{verificationResult.issueDate}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <span className="text-red-600 font-semibold">{t('certificateInvalid')}</span>
                            </div>
                            <p className="text-gray-600">{t('certificateNotFound')}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default CertificateVerification;