function myfun(){

    $.get("/Supervision/insertSupervision",{
            supervision_id:"1",
            user_id:"1",
            apply_date:"1",
            company_name_zh:"1",
            company_name_en:"1",
            company_addr_zh:"1",
            company_addr_en:"1",
            payerinfo_company:"1",
            payerinfo_other:"1",
            contact_person:"1",
            contact_telephone:"1",
            contact_fax:"1",
            contact_email:"1",
            commodity:"1",
            quantity:"1",
            vessel:"1",
            packing:"1",
            size:"1",
            load_port:"1",
            destination:"1",
            inspection_location:"1",
            required_inspection_date:"1",
            is_lc:"1",
            sampling_at_warehouse:"1",
            sampling_at_plant:"1",
            sampling_at_quayside:"1",
            sampling_at_100:"1",
            sampling_at_random:"1",
            weighing_at_warehouse:"1",
            weighing_at_plant:"1",
            weighing_at_quayside:"1",
            weighing_at_100:"1",
            weighing_at_random:"1",
            weighing_at_supervision:"1",
            weighing_at_initial:"1",
            weighing_at_intermidiate:"1",
            cargo_at_warehouse:"1",
            cargo_at_plant:"1",
            cargo_at_quayside:"1",
            cargo_at_visual:"1",
            cargo_at_packing:"1",
            cargo_at_check:"1",
            porthanding_loading:"1",
            porthanding_discharging:"1",
            porthanding_hold:"1",
            containe_stuffing:"1",
            containe_seal:"1",
            containe_unloading:"1",
            tally_at_container:"1",
            tally_at_loading:"1",
            other_requirements:"1",
            analysis_chemical:"1",
            analysis_physical:"1",
            analysis_other:"1",
            invoice_type:"1",
            invoice_chinese:"1",
            invoice_english:"1",
            invoice_title:"1",
            dispatch_via:"1",
            delivery_addr:"1",
            inspection_fee:"1",
            analysis_fee:"1",
            paper_fee:"1",
            added_fee:"1",
            others_fee:"1",
            travelling_fee:"1",
            englishreport_fee:"1",
            totle_fee:"1",
            commission_filepath:"1",
            invoice_filepath:"1",
            report_filepath:"1",
            status:"1"
        },
        function (data,status) {
            alert(data);
        })
}