import { InternalServerErrorException } from "@nestjs/common";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";

export async function saveFile(image: Express.Multer.File, userEmail: string) {
    const date = new Date();
    const DDMMYY = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

    const rootPath = process.cwd();
    const userFolder = join(rootPath, "image", DDMMYY);

    // Create folder
    try {
        await mkdir(userFolder, { recursive: true });

        // Final path
        const finalPath = join(userFolder, userEmail + '-' + image.originalname);

        console.log("Saving to:", finalPath);

        // Write file
        await writeFile(finalPath, image.buffer);

        return finalPath;
    }
    catch (e: any) {
        new InternalServerErrorException("Processing File Error");
    }


}