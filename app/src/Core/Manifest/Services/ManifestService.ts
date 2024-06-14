import { ManifestDto } from '../Dto/ManifestDto';
import packageJson from '../../../package.json';
import DateFormat from '../Utils/DateFormat';

export class ManifestService {
  public async invoke(): Promise<ManifestDto> {
    return {
      timestamp: DateFormat.timestamp(new Date()),
      version: packageJson.version,
    };
  }
}
