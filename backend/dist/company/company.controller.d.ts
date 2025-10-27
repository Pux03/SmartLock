import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
export declare class CompanyController {
    private readonly companyService;
    constructor(companyService: CompanyService);
    create(createCompanyDto: CreateCompanyDto): Promise<import("./entities/company.entity").Company>;
    findAll(): Promise<import("./entities/company.entity").Company[]>;
    findOne(id: string): Promise<import("./entities/company.entity").Company | null>;
    update(id: string, updateCompanyDto: UpdateCompanyDto): string;
    remove(id: string): string;
}
