import { ManifestService } from './Services/ManifestService';
import { ManifestController } from './Actions/ManifestController';

const manifestService = new ManifestService();

const manifestController = new ManifestController(manifestService);

export { manifestController, manifestService };
