import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
export declare class CompanyService {
    private companyRepository;
    constructor(companyRepository: Repository<Company>);
    create(createCompanyDto: CreateCompanyDto): Promise<Company>;
    findAll(): Promise<Company[]>;
    findOne(id: number): Promise<Company | null>;
    update(id: number, updateCompanyDto: UpdateCompanyDto): string;
    remove(id: number): string;
}
