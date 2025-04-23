import io, time
from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from azure.cognitiveservices.vision.computervision.models import OperationStatusCodes
from msrest.authentication import CognitiveServicesCredentials

AZURE_ENDPOINT = "https://dyslexiazd.cognitiveservices.azure.com/"
AZURE_KEY      = "5CKFAIsdDlK3y6X1NoWVsUNNq7ZGxNUYCYDc67Ix92ipT5OQa96uJQQJ99BDACYeBjFXJ3w3AAAFACOGlflR"

computervision_client = ComputerVisionClient(
    AZURE_ENDPOINT,
    CognitiveServicesCredentials(AZURE_KEY)
)

def extract_text_from_image(path: str) -> str:
    with open(path, "rb") as f:
        image_data = f.read()
    read_response = computervision_client.read_in_stream(
        io.BytesIO(image_data), raw=True
    )
    operation_id = read_response.headers["Operation-Location"].split("/")[-1]

    while True:
        result = computervision_client.get_read_result(operation_id)
        if result.status not in ('notStarted', 'running'):
            break
        time.sleep(1)

    if result.status == OperationStatusCodes.succeeded:
        lines = [
            line.text
            for page in result.analyze_result.read_results
            for line in page.lines
        ]
        return " ".join(lines)
    else:
        return ""