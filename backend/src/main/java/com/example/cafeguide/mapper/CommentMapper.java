package com.example.cafeguide.mapper;

import com.example.cafeguide.config.MapperConfig;
import com.example.cafeguide.dto.comment.CommentDto;
import com.example.cafeguide.dto.comment.CommentRequestDto;
import com.example.cafeguide.model.Cafe;
import com.example.cafeguide.model.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.Named;

@Mapper(config = MapperConfig.class)
public interface CommentMapper {
    @Mappings({
            @Mapping(target = "cafeId", source = "cafe.id"),
            @Mapping(target = "userName", source = "user.name"),
            @Mapping(target = "userImage", source = "user.image")
    })
    CommentDto toDto(Comment comment);

    @Mappings({
            @Mapping(target = "cafe", source = "cafeId", qualifiedByName = "cafeFromId")
    })
    Comment toEntity(CommentRequestDto requestDto);

    @Named("cafeFromId")
    default Cafe cafeFromId(Long id) {
        Cafe cafe = new Cafe();
        cafe.setId(id);
        return cafe;
    }
}
