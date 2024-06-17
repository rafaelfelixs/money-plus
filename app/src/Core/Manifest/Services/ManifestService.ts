import { ManifestDto } from '../Dto/ManifestDto';
import packageJson from '../../../../package.json';

export class ManifestService {
  public async invoke(): Promise<ManifestDto> {
    return {
      timestamp: String(new Date()),
      version: packageJson.version,
    };
  }
}
