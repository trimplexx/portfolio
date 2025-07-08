import { BlobServiceClient } from "@azure/storage-blob";

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

if (!connectionString || !containerName) {
  throw new Error(
    "Brak konfiguracji dla Azure Storage. Sprawdź zmienne środowiskowe."
  );
}

const containerClient =
  BlobServiceClient.fromConnectionString(connectionString).getContainerClient(
    containerName
  );

export async function deleteBlob(fileUrl: string) {
  try {
    const url = new URL(fileUrl);
    const blobName = decodeURIComponent(
      url.pathname.substring(url.pathname.lastIndexOf("/") + 1)
    );

    if (!blobName) {
      console.warn(`Nie można wyodrębnić nazwy bloba z URL: ${fileUrl}`);
      return;
    }

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.delete();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.statusCode === 404) {
      console.warn(
        `Blob nie został znaleziony (mógł zostać usunięty wcześniej): ${fileUrl}`
      );
    } else {
      console.error(`Błąd podczas usuwania bloba ${fileUrl}:`, error.message);
      throw new Error(`Nie udało się usunąć pliku z Azure: ${fileUrl}`);
    }
  }
}
