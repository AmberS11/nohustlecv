import React from 'react';

const Disclaimer = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-4">Disclaimer</h1>
      <p className="mb-4">
        NoHustleCV is an AI-powered tool intended to assist users in creating resumes and cover letters. While we strive to provide accurate and relevant suggestions, the final responsibility for the content, accuracy, and completeness of any resume or document lies with the user.
      </p>
      <p className="mb-4">
        We do not guarantee job placement, interview calls, or hiring outcomes. The service is provided "as-is" without warranties of any kind, either express or implied. Users are encouraged to verify the content before submission to any employer or job portal.
      </p>
      <p className="mb-4">
        NoHustleCV and its creators are not liable for any direct, indirect, incidental, or consequential damages resulting from the use or misuse of this platform.
      </p>
    </div>
  );
};

export default Disclaimer;
