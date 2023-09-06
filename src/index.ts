import 'dotenv/config'
import { AzureKeyCredential, DocumentAnalysisClient } from "@azure/ai-form-recognizer";

  const key = process.env.KEY || '';
  const endpoint = process.env.ENDPOINT || '';

  // sample document
  const formUrl = 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/green-and-white-business-card-design-template-7269fcf133471ec7a1e942852daebd24_screen.jpg'
  // const formUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/businessCard.png"

  async function main() {
    const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));

    console.log('Scanning....')

    const poller = await client.beginAnalyzeDocumentFromUrl("prebuilt-businessCard", formUrl);

    const { documents } = await poller.pollUntilDone();

    if (documents?.length) {
      const fields = documents[0].fields;
      for (const key in fields) {
          console.log("- Key  :", `"${key}"`, '\n');
          console.log(" Value:", fields[key]);
          console.log('----------------------')
      }
    } else {
      console.log("No key-value pairs were extracted from the document.");
    }
}

main().catch((error) => {
    console.error("An error occurred:", error);
    process.exit(1);
});